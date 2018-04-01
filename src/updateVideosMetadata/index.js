const plexApi = require('@boostup/plex-api')
const ytSearch = require('../utils/yt-api/index')
const cmdProgress = require('../utils/flow/cmd-progress')

const config = require('../config');
plexApi.setConfig(config.plex);
ytSearch.setConfig(config.yt);

const updateVideosMetadata = async () => {
    return plexApi.getDocus()
        .then( docus => docus.map(handleDocu) )
        .then(plexApi.launchFileScan)
        .then( _ => cmdProgress("updateVideosMetadata procedure is done!"))
        .catch(console.error)
}

module.exports = updateVideosMetadata;

/********************************************* */


const handleDocu = (docu) => {
    const {ratingKey, title, summary} = docu;

    if(summary) 
        return cmdProgress(`docu ${ratingKey} (${title}) already has a summary;  aborting metadata update`);

    cmdProgress(`Querying youtube with title: ${title}`); 

    ytSearch.searchByTitle(title, 1)
        .then(getYTVidWithFullDesc)
        .then(YTVideo => updateMetadata(ratingKey, YTVideo))
        .catch(err => console.error(err))
        .then(() => console.info('-------------------'));

}

const getYTVidWithFullDesc = (YTVideo) => {
    cmdProgress(`Querying Youtube with id: ${YTVideo.id}`);
    return ytSearch.searchByVideoId(YTVideo.id)  
}

const updateMetadata = (plexDocuId, YTVideo) => {
    cmdProgress(`Updating plexDocuId: ${plexDocuId} / Youtube with id:${YTVideo.id}`);
    plexApi.updateMetadata(plexDocuId, YTVideo);
}
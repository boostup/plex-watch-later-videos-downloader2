const plexApi = require('@boostup/plex-api')
const ytSearch = require('../utils/yt-api/index')

const config = require('../config');
plexApi.setConfig(config.plex);
ytSearch.setConfig(config.yt);

const updateVideosMetadata = () => {
    plexApi.getDocus()
    .then( docus => docus.map(handleDocu) )
    .then(plexApi.launchFileScan)
}

module.exports = updateVideosMetadata;

/********************************************* */


const handleDocu = (docu) => {
    const {ratingKey, title, summary} = docu;

    if(summary) 
        return console.info(`docu ${ratingKey} (${title}) already has a summary;  aborting metadata update`);

    console.info(`Querying youtube with title: ${title}`); 

    ytSearch.searchByTitle(title, 1)
        .then(getYTVidWithFullDesc)
        .then(YTVideo => updateMetadata(ratingKey, YTVideo))
        .catch(err => console.error(err))
        .then(() => console.log('-------------------'));

}

const getYTVidWithFullDesc = (YTVideo) => {
    console.log(`Querying Youtube with id: ${YTVideo.id}`);
    return ytSearch.searchByVideoId(YTVideo.id)  
}

const updateMetadata = (plexDocuId, YTVideo) => {
    console.log(`Updating plexDocuId: ${plexDocuId} / Youtube with id:${YTVideo.id}`);
    plexApi.updateMetadata(plexDocuId, YTVideo);
}
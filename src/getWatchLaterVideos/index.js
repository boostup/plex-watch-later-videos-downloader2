const fs   = require('fs')
const path = require('path')
const plex = require('@boostup/plex-api')
const ytdl = require('ytdl-core')
const beautify = require('js-beautify').js_beautify
const sanitize = require('sanitize-filename')
const deleteFile = require('../utils/fs/deleteFile')
const writeFile = require('../utils/fs/writeStrToFile')
const cmdProgress = require('../utils/flow/cmd-progress')

const getWatchLaterVideos = async () => {

	try {
		cmdProgress("getWatchLaterVideos procedure has started...");
		const result = await plex.getWatchLaterVideos();
		const videos = extract(result.MediaContainer.Video);
		logVideos(videos);
		videos.map(downloadVideo)
		cmdProgress(`All downloads started (${videos.length} download(s) in total)...`);
	} catch(e) {
        throw e;
	}

	/**
	 * This is the promise-based syntax version.  Just to appreciate sync/await syntax a little bit more.
	 
	return plex.getWatchLaterVideos()
		.then( res => {
			console.log("=====> getWatchLaterVideos procedure has started")
			return res.MediaContainer.Video;
		})
		.then(videos => extractVideoUrls(videos))
		.then(logUrls)
		.then(urls => urls.map(downloadVideo))
		.then( _ => console.log("=====> All downloads started..."))
		.catch((error) => {
			console.error("The following error was caught:\n");
            throw error;
		})
		
		*/
}

module.exports = getWatchLaterVideos;

/************************************** */

const extract = videos => {
	if(videos === undefined) throw new Error("There are currently no videos in the Watch Later playlist"); 
	let videoUrls = new Array();
	//when videos is NOT an array
	!videos.map && videoUrls.push(extractMetada(videos))
	//when videos IS an array
	videos.map && videos.map(video=>videoUrls.push(extractMetada(video)));
	return videoUrls;
}

const extractMetada = video => {
	return {
		title: video.title,
		url: video.url
	}
}

const logVideos = async videos => {
	const logFilePath = "downloads.txt";
	await deleteFile(logFilePath);
	const urlsStr = beautify(JSON.stringify(videos));
	cmdProgress(`Videos to download:\n${urlsStr}`);
	await writeFile(logFilePath, urlsStr);
	return videos;
}

const downloadVideo = video => {
	ytdl.getInfo(video.url).then(vidInfo => {
		const formats = vidInfo.formats.filter(format => {
			return format.container === "mp4" && format.quality === "medium"
		})
		const dl = ytdl(video.url, {format: formats[0]});
		dl.pipe(fs.createWriteStream(path.resolve('./Documentaries', `${sanitize(vidInfo.title)}.mp4`)));
	}, err => {
	  console.error("this is now handled::::::::::>" + err)
	})	
}
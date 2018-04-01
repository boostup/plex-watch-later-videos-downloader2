const fs   = require('fs')
const path = require('path')
const plex = require('@boostup/plex-api')
const ytdl = require('ytdl-core')
const sanitize = require('sanitize-filename')
const deleteFile = require('../utils/fs/deleteFile')
const writeFile = require('../utils/fs/writeStrToFile')

const getWatchLaterVideos = () => {
	plex.getWatchLaterVideos()
		.then(res => extractVideoUrls(res.MediaContainer.Video))
		.then(logUrls)
		.then(urls => urls.map(downloadVideo))
		.catch((error) => {
			console.error("The following error was caught:\n");
            throw error;
        })
}

module.exports = getWatchLaterVideos;

/************************************** */

const extractVideoUrls = videos => {
	let videoUrls = new Array();
	videos.map(vid=>
		videoUrls.push(vid.url)
	);
	return videoUrls;
}

const logUrls = async urlsArr => {
	const logFilePath = "urls.txt";
	await deleteFile(logFilePath);
	const urlsStr = urlsArr.join("\n");
	console.log(`Videos to download:\n${urlsStr}`);
	writeFile(logFilePath, urlsStr);
	return urlsArr;
}

const downloadVideo = videoUrl => {
	ytdl.getInfo(videoUrl).then(vidInfo => {
		const formats = vidInfo.formats.filter(format => {
			return format.container === "mp4" && format.quality === "medium"
		})
		const video = ytdl(videoUrl, {format: formats[0]});
		video.pipe(fs.createWriteStream(path.resolve('./Documentaries', `${sanitize(vidInfo.title)}.mp4`)));
	}, err => {
	  console.error("this is now handled::::::::::>" + err)
	})	
}
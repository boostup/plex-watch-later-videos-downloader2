const getWatchLaterVideos = require('./getWatchLaterVideos/index')
const updateVideosMetadata = require('./updateVideosMetadata/index')

async function main() {
	try {
		await getWatchLaterVideos()
		await updateVideosMetadata()
	} catch (error) {
		console.error(error);
	}

}
module.exports = main
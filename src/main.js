const getWatchLaterVideos = require('./getWatchLaterVideos/index')
const updateVideosMetadata = require('./updateVideosMetadata/index')
const wait = require('./utils/flow/wait');

async function main() {
	try {
		await getWatchLaterVideos();
		//This wait stuff is not working so comenting it!!!
		// wait(10000);
		// await updateVideosMetadata();
	} catch (error) {
		console.error(error);
	}

}
module.exports = main

/***************************** */


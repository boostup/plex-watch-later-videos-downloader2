const getWatchLaterVideos = require('./getWatchLaterVideos/index')
const updateVideosMetadata = require('./updateVideosMetadata/index')

function main() {
	getWatchLaterVideos();
	updateVideosMetadata();
}
module.exports = main
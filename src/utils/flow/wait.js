const cmdProgress = require('./cmd-progress')

module.exports = function(timeToWait) {
	setTimeout( () => cmdProgress(`waited ${timeToWait}`), timeToWait);
}
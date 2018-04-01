# Project Description
This project is a nodeJS console application.
It is a personal project that I quickly put together in order to archive videos from YouTube that are likely to diseappear.  
This app first gets the urls of the videos from my Plex Media Server "watch later" playlist and then goes on with the download.
It uses a small package I published on NPM => https://www.npmjs.com/package/@boostup/plex-api

# TO DO
- run a small experiment mixing up async and sync function to ensure that updateVideosMetadata() will run, as it is in main.js, AFTER all async functions inside getWatchLaterVideos() are done
- getWatchLaterVideos>extractVideoUrls: shouldn't this function be part of my small plex-api npm package?
- write missing tests
- make ytSearch a package. BUT, when this becomes a package sitting inside the node_modules folder, I can't have consumers of the package write their config file there...
- replace promise syntax with async/await so that I can try/catch better
- create a new npm package with the files in utils folder found in:
    - this project
    - survey-sample-gen

# Roadmap
Please visit the roadmap page on the wiki of this repository:
https://github.com/boostup/plex-watch-later-videos-downloader2/wiki/Roadmap
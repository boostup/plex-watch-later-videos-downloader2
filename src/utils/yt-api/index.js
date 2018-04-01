const axios = require('axios')
const search = require('youtube-search')

let API_KEY;

const APICaughtError = (msg) => {
    throw Error(`[YTSearch.js] Error caught: ${msg}`)
};

const setConfig = (conf) => {
    try {
        API_KEY = conf.apiKey;
    } catch (error) {
        APICaughtError(error)
    }
}

const searchByTitle = (term, max = 10) => {
    return new Promise((resolve, reject) => {
        var opts = {
            maxResults: max,
            key: API_KEY
        };
        search(term, opts, function (error, results) {
            if (error || results.length === 0) reject("No video found on Youtube for title: " + term);
            resolve(results[0]);
        });
    })
}



const searchByVideoId = (videoId) => {
    const queryTPL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=VID_ID&key=${API_KEY}`;
    const vidQuery = queryTPL.replace("VID_ID", videoId);
    return axios.get(vidQuery)
        .then(function (response) {
            if (response.data.items.length === 0) APICaughtError("No video found on Youtube for id: " + videoId);
            return response.data.items[0];
        })
        .catch(function (error) {
            return APICaughtError(error)
        });
}

module.exports = {
    setConfig,
    searchByTitle,
    searchByVideoId
}
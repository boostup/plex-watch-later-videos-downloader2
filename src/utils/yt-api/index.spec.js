const assert = require('assert');
searchYTByTitle = require('./index').searchByTitle;
searchByVideoId = require('./index').searchByVideoId;

describe('YTSearch', function() {

  describe('searchYTByTitle()', function () {
    it('should return at least one element with a description', function() {
      return searchYTByTitle("10 FAITS", 1)
        .then( video => {
          assert.equal(true, video.description !== null)
        })
    });    
  })

  describe('searchByVideoId()', function () {
    it('should return at least one element with a description', function() {
      return searchByVideoId("XnXKia5MWpk")
        .then( video => {
          assert.equal(true, video.description !== null)
        })
    });    
  })
  
});


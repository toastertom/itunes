angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

  this.getArtist = function (artist) {
    var defer = $q.defer();
     $http({
      method: 'JSONP',
      url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    }).then(function (response) {

      var filterArtistData = response.data.results;
      var responseData = [];
      // Need to iterate through the data we get back form the API.
      for(var i = 0; i < filterArtistData.length; i++){
      // Then we need to conform the data to fit the ng-gird by creating a new object & pushing it to the new array above "responseData"
        var obj = {
          Artist: filterArtistData[i].artistName,
          AlbumArt: filterArtistData[i].artworkUrl100,
          Collection: filterArtistData[i].collectionName,
          CollectionPrice: filterArtistData[i].collectionPrice,
          Play: filterArtistData[i].previewUrl,
          Type: filterArtistData[i].kind
        }
        // Push data to responseData array.
        responseData.push(obj);
      }
      console.log(response);
      // responseData is passed along to the promise.
      defer.resolve(responseData);
    })
    return defer.promise;
  }

});

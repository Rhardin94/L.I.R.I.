//All required modules to make app work correctly
const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
//Capturing console input to determine which part of app to run
let apiType = process.argv[2];
let Search = process.argv[3];
//Switch used to determine which API to interact with
switch (apiType) {
    case "spotify-this-song":
        songFinder();
        break;
    case "movie-this":
        movieFinder()
        break;
};
//Function to search spotify
function songFinder() {
    //Testing spotify
    spotify.search({
            type: 'track',
            query: Search,
            limit: 5,
        }).then(function (data) {
            console.log(data, null, 2);
        })
        .catch(function(err) {
            console.log(err);
        });
    };
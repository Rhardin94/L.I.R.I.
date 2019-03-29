//All required modules to make app work correctly
const axios = require("axios");
const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
//Capturing console input to determine which part of app to run
let apiType = process.argv[2];
let Search = process.argv.slice(3).join(" ");
//Switch used to determine which API to interact with
switch (apiType) {
    case "spotify-this-song":
        Search += " ";
        songFinder();
        break;
    case "movie-this":
        Search += "+";
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
        }).then(function (response) {
            console.log(response, null, 2);
        })
        .catch(function(err) {
            console.log(err);
        });
    };
//Function to search omdb
function movieFinder() {
    queryURL = "https://www.omdbapi.com/?t=" + Search + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
    .then(function(response) {
/*Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.*/
console.log("Title: " + response.data.Title);
console.log("Release Year: " + response.data.Released);
console.log("IMDB Rating: " + response.data.Ratings[0].Value);
console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
console.log("Country/ies Produced in: " + response.data.Country);
console.log("Language: " + response.data.Language);
console.log("Plot: " + response.data.Plot);
console.log("Actors: " + response.data.Actors);
    });
}
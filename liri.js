//All required modules to make app work correctly
const dotenv = require("dotenv").config();
const axios = require("axios");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
//Capturing console input to determine which part of app to run
let apiType = process.argv[2];
let Search = process.argv.slice(3).join(" ");
if (Search === "") {
    Search = "mr nobody";
}
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
            limit: 1,
        }).then(function (response) {
            console.log("Artist/s: " + response.tracks.items[0].album.artists[0].name);
            console.log("Song Title: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
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
console.log("Country/s Produced In: " + response.data.Country);
console.log("Language: " + response.data.Language);
console.log("Plot: " + response.data.Plot);
console.log("Actors: " + response.data.Actors);
    });
}
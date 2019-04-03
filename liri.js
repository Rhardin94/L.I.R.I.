//All required modules to make app work correctly
const dotenv = require("dotenv").config();
const axios = require("axios");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const moment = require("moment");
const fs = require("fs");
const inquirer = require("inquirer");
//Testing inquirer only runs if the user doesn't input an apiType
let count = 0;
function liriHelper() {
  if (!process.argv[2]) {
    inquirer
      .prompt([{
        name: "whatAPI",
        message: "Welcome to Liri! What can I help you with today?",
        type: "list",
        choices: ["Look up a movie", "Look up a song", "Look up a concert", "Dealer's Choice"]
      }]).then(function (response) {
        count++;
        switch (response.whatAPI) {
          case "Look up a movie":
            return console.log("Type this: 'node liri.js + movie-this + the movie of your choice (minus the +)");
          case "Look up a song":
            return console.log("Type this: node liri.js + spotify-this-song + the song of your choice (minus the +)");
          case "Look up a concert":
            return console.log("Type this: node liri.js + concert-this + the artist of your choice (minus the +)");
          case "Dealer's Choice":
            return console.log("Type this: node liri.js + do-what-it-says (minus the +)");
        }
      })
  }
}
liriHelper();
//Capturing console input to determine which part of app to run
let apiType = process.argv[2];
let Search = process.argv.slice(3).join(" ");
let commandLog = process.argv;
//Switch used to determine which API to interact with
switch (apiType) {
  case "spotify-this-song":
    Search += " ";
    songFinder();
    break;
  case "movie-this":
    if (Search === "") {
      Search = "mr nobody";
    }
    //Search += "+";
    movieFinder()
    break;
  case "concert-this":
    bandFinder();
    break;
  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      data = data.split(",");
      //apiType = data[0];
      Search = data[1];
      Search += "+";
      songFinder();
    })
};
//Function to search spotify
function songFinder() {
  //Testing spotify
  spotify.search({
      type: 'track',
      query: Search,
      limit: 1,
    }).then(function (response) {
      console.log(
        "\nArtist/s: " + response.tracks.items[0].album.artists[0].name +
        "\nSong Title: " + response.tracks.items[0].name +
        "\nPreview URL: " + response.tracks.items[0].preview_url +
        "\nAlbum: " + response.tracks.items[0].album.name
      );
      //appends each command to the log.txt file
      fs.appendFile("log.txt",
        "\n------\n" +
        "\n" + "node liri.js " + apiType + " " + Search + "\nArtist/s: " + response.tracks.items[0].album.artists[0].name +
        "\nSong Title: " + response.tracks.items[0].name +
        "\nPreview URL: " + response.tracks.items[0].preview_url +
        "\nAlbum: " + response.tracks.items[0].album.name,
        function (err) {
          if (err) {
            return console.log(err);
          }
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};
//Function to search omdb
function movieFinder() {
  queryURL = "https://www.omdbapi.com/?t=" + Search + "&y=&plot=short&apikey=trilogy";
  axios.get(queryURL)
    .then(function (response) {
      /*Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.*/
      console.log(
        "\nTitle: " + response.data.Title +
        "\nRelease Year: " + response.data.Released +
        "\nIMDB Rating: " + response.data.Ratings[0].Value +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\nCountry/s Produced In: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nActors: " + response.data.Actors
      );
      if (Search === "mr nobody") {
        Search = "";
      }
      fs.appendFile("log.txt",
        "\n------\n" +
        "\n" + "node liri.js " + apiType + " " + Search +
        "\nTitle: " + response.data.Title +
        "\nRelease Year: " + response.data.Released +
        "\nIMDB Rating: " + response.data.Ratings[0].Value +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\nCountry/s Produced In: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nActors: " + response.data.Actors,
        function (err) {
          if (err) {
            return console.log(err);
          }
        })
    });
}
//Function to search bandsintown
function bandFinder() {
  queryURL = "https://rest.bandsintown.com/artists/" + Search + "/events?app_id=codingbootcamp";
  axios.get(queryURL)
    .then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        console.log("\n" + Search.toUpperCase() + " Events: " +
          "\nVenue: " + response.data[i].venue.name +
          "\nLocation: " + response.data[i].venue.city + "/" + response.data[i].venue.country +
          "\nDate: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n"
        );
      }
    })
}
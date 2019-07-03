# Liri-Node-App: a node-based application that takes userinput from the command-line and returns data from OMDB, Spotify, and Bandsintown respectively.
### A link to a demo can be found here: https://drive.google.com/file/d/1TDuus6k-dMUWgKzbpJ6GsKnQ-r6s4B18/view
## Overview
L.I.R.I. is a node-based cli app that functions as a mock Siri search engine. When running the app via `node liri.js`, the user is given the choice of searching for:
* Movies
* Songs
* Concerts

Once the user decides which search to run, L.I.R.I returns the approriate data in the console and logs the output in log.txt.

## Setup
To use L.I.R.I, the user must first clone the repo via `git clone https://github.com/Rhardin94/L.I.R.I..git`. Once the repo is cloned, navigate into the repo's directory and run `npm i` to install all the required packages. The user will also need a `.env` file with SPOTIFY_ID and SPOTIFY_SECRET variables to use the song search functionality. After installation, simply run `node liri.js` for further instructions.

## How to use
Upon running `node liri.js`, the user is given a choice of searches to perform.

![home page offering different search options](/assets/screenshots/home.jpg)

### Movie Search
If the user chooses to 'look up a movie', L.I.R.I gives them the next command to perform the search

![type node liri.js movie-this 'movie name here'](/assets/screenshots/moviesearch.jpg)

Once the user runs the movie search, they are returned the movie data.

![title, release year, IMDB rating, rotten tomatoes rating, countries produced in, language, plot, and actors of the searched movie](/assets/screenshots/moviedata.jpg)

### Song Search
If the user chooses to 'look up a song', L.I.R.I. gives them the following command to perform that search as well.

![type node.js spotify-this-song 'your song here'](/assets/screenshots/songsearch.jpg)

After the user runs the song search, they are returned the song data.

![artists, song title, preview url, and album of song search](/assets/screenshots/songdata.jpg)

### Concert Search
If the user chooses to 'look up a concert', L.I.R.I. gives them the appropriate command to run the search.

![type node.js concert-this 'your artist here'](/assets/screenshots/concertsearch.jpg)

As the user runs the concert search, they will be returned the concert/s info.

!['artist' has 'x' events, venue, location, and data](/assets/screenshots/concertdata.jpg)

### Logs
After running a search, L.I.R.I logs the search command and the returned data in `log.txt` for troubleshooting and organization.

![previous commands and outputs](/assets/screenshots/logs.jpg)

## Tech
* [Axios](https://www.npmjs.com/package/axios)
* [FS](https://www.npmjs.com/package/fs)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [Moment](https://www.npmjs.com/package/moment)
* [Node Spotify API](https://www.npmjs.com/package/node-spotify-api)

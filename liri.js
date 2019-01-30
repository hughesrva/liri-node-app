// imports
require("dotenv").config();
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

//
// node commands
var nodeArg = process.argv;
var command = nodeArg[2];
var argArr = [];
for (var i = 3; i < nodeArg.length; i++) {
  argArr.push(nodeArg[i]);
}

//
// api calls
// concert-this <artist/band name here>
function concertCall(arg) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        arg +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (var j = 0; j < response.data.length; j++) {
        console.log("Venue name: " + response.data[j].venue.name);
        console.log(
          "Start time: " +
            moment(response.data[j].datetime).format(
              "dddd, MMMM Do YYYY, h:mm a"
            )
        );
        console.log("City: " + response.data[j].venue.city);
        console.log("Country: " + response.data[j].venue.country);
        console.log("~~~~~~~~~~~~~~");
      }
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

// spotify-this-song <song title here>
function songCall(arg) {
  if (arg === "") {
    arg = "The Sign";
  }
  spotify
    .search({
      type: "track",
      query: arg
    })
    .then(function(response) {
      for (i = 0; i < response.tracks.items.length; i++) {
        if (
          response.tracks.items[i].name
            .toLowerCase()
            .includes(arg.toLowerCase())
        ) {
          console.log("~~~~~~~~~~~~~~~~~~~~");
          console.log(
            "Artist Name: " + response.tracks.items[i].artists[0].name
          );
          console.log("Song Name: " + response.tracks.items[i].name);
          console.log("Album Name: " + response.tracks.items[i].album.name);
          if (response.tracks.items[0].preview_url === null) {
            console.log("There's no preview for this song. Sorry :(");
          } else {
            console.log("Preview: " + response.tracks.items[i].preview_url);
          }
          console.log("~~~~~~~~~~~~~~~~~~~~");
        }
      }
    });
}

// movie-this <movie title here>
function movieCall(arg) {
  if (arg === "") {
    var arg = "Mr+Nobody";
  }
  axios
    .get("http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
      console.log("~~~~~~~~~~~~~~~~~~~~");
      console.log("Title: " + response.data.Title);
      console.log("Year of Release: " + response.data.Year);
      console.log("IMDB rating: " + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language(s): " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Cast: " + response.data.Actors);
      console.log("~~~~~~~~~~~~~~~~~~~~");
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

//do-what-it-says
function obeyCall() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var txtArr = data.split(",");
    var toDo = txtArr[0];
    // calls each function based on its query's syntax
    if (toDo === "movie-this") {
      movieCall(txtArr[1].replace(/ /g, "+"));
    } else if (toDo === "spotify-this-song") {
      songCall(txtArr[1]);
    } else if (toDo === "concert-this") {
      concertCall(txtArr[1].replace(/ /g, "%20"));
    }
  });
}

//
// makes calls based on node command
if (command === "concert-this") {
  concertCall(argArr.toString().replace(/,/g, "%20"));
} else if (command === "spotify-this-song") {
  songCall(argArr.toString());
} else if (command === "movie-this") {
  movieCall(argArr.toString().replace(/,/g, "+"));
} else if (command === "do-what-it-says") {
  obeyCall();
} else {
  console.log("That's not a supported command!");
}

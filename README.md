# liri-bot

### Summary
This is a Node-based command line interface that allows the user to enter one of three commands followed by what they want to search in order to view information about it.

###### To see the app in action: https://drive.google.com/file/d/1UpEgcPzPu18hgiXob7hD-EIBudtM4vu9/view

### Concert Search
###### Syntax: concert-this < artist/band name here >
Displays (10) upcoming concerts that match the entered artist along with the venue name, start time, city, and country in which the concert takes place.
Uses the Axios package to call the Bands In Town API.

### Song Search
###### Syntax: spotify-this-song < song name here >
Displays up to (20) songs that match the entered title along with the artist name, song name, album name and a URL to preview the song.
Uses the Node Spotify API package to call the Spotify API.

### Movie Search
###### Syntax: movie-this < movie name here > 
Displays the first movie that matches the entered title along with its title, year of release, IMDB and Rotten Tomatoes ratings, country, language(s), plot and cast.
Uses the Axios package to call the OMDB API.

### Text File Search
###### Syntax: do-what-it-says
Parses the command and arguments listed in the 'random.txt' file, then makes a Concert, Song or Movie search accordingly.


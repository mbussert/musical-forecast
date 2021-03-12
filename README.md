# musical-forecast
A web application to generate music based on the user's specified location.


## OVERVIEW 

We started this project by creating a basic HTML file with sections where our data would be displayed. After that, we decided who would be working on what section and split up.

INDEX.HTML

The index.html file contains the information for the transition/animation page.

FORECAST.HTML

This file includes all of the home page information and sections and cards for the javascript files to have functions appended to.

MAIN.JS

This file contains the animations for pageload

WEATHER.JS

For this file, we created a promise that fetches the current forecast and on the fetch the five day forecast. Included in this file are two click functions. Both are used to get the output of the searched city. One is for the transition page and the other for the home page.

MUSIC.JS

For the music.js file, we created an onload function that includs the redirection to the client id and password, and saves to local storage. This file contains a function to get a playlist and a function to get the tracks. We also created a function to display the music being played. Most of the work in this file was spent creating functions to allow users to fully access our webpage after logging in to their personal spotify account.

APP.JS

The app.js file contains the client spotify authorization to load songs after the search button has been clicked and a max number of songs to be displayed.

CSS

For the CSS file, we tried to minimize the amount of CSS styling because our main focus was to use Bulma. 


## LINK TO DEPLOYED WEBSITE

https://mbussert.github.io/musical-forecast

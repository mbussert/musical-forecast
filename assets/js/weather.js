$(document).ready(function () {
    let weatherButton = $('.button');

    // function that fetches api 
    function getApi(name) {
        // where the api is being fetched from
        let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=9c15991b27b985193a8286709e2840d9&units=imperial'
        // calling the fetch
        fetch(requestUrl)
            // response.json() returns another promise from the function body
            .then(function (response) {
                return response.json();
            })

            // second promise to get data from the api
            .then(function (data) {
                // you will need to console.log(data) to fetch the info you need to write your code
                console.log(data);
                // creating divs that get the name, temp of current, high, and low, and an icon
                let city = $('<div>').text(data.name);
                let temp = $('<div>').text('Currently, it is ' + (Math.round(data.main.temp)) + String.fromCharCode(176));
                let high = $('<div>').text('High of ' + (Math.round(data.main.temp_max)) + String.fromCharCode(176));
                let low = $('<div>').text('Low of ' + (Math.round(data.main.temp_min)) + String.fromCharCode(176));
                // icons are images so they are put in img tags
                let icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');

                // i appended the city, temps and icon to the current-condition element from the html file
                // you will need to append your data to a different element
                $('.current-condition').append(city, temp.append(icon), high, low)
                getfiveday(data.coord.lat, data.coord.lon)
            })
    }

    // this chunk of code tells the computer to read the searched name from the input box when the button is 
    // clicked and to search the info from getApi()

    // weatherButton is defined on line 2
    weatherButton.on('click', function () {
        // cityFinder is the name of the input box
        let searches = $('.cityFinder').val().trim()
        console.log(searches)

        // tells the computer to display the data from lines 20-29
        getApi(searches);

    })


    function getfiveday(lat, lon) {
        // where the api is being fetched from
        let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=9c15991b27b985193a8286709e2840d9&units=imperial`
        // calling the fetch
        fetch(requestUrl)
            // response.json() returns another promise from the function body
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                console.log(data);
                for (let i = 1; i < 6; i++) {
                    let fivedaytemp = $("<div>").text(Math.round(data.daily[i].temp.day) + String.fromCharCode(176));
                    console.log(fivedaytemp);
                    $('.future-conditions').append(fivedaytemp)
                }
            })
    }

    // your 5 day forecast function will go here
    // this is the api key you can use
    // https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=9c15991b27b985193a8286709e2840d9&units=imperial
})
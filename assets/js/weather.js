let weatherButton = $('.button');
let introBtn = $('#introButton');

$(document).ready(function () {
    // function recentSearches() {

    // }

    // function that fetches api 
    function getApi(name) {
        let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=9c15991b27b985193a8286709e2840d9&units=imperial'
        
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                console.log(data);
                let city = $('<div>').text(data.name);
                let temp = $('<div>').text('Currently, it is ' + (Math.round(data.main.temp) + String.fromCharCode(176)));
                let high = $('<div>').text('High of ' + (Math.round(data.main.temp_max) + String.fromCharCode(176)));
                let low = $('<div>').text('Low of ' + (Math.round(data.main.temp_min) + String.fromCharCode(176)));
                let icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');

                $('.current-condition').append(city, temp.append(icon), high, low)
                getfiveday(data.coord.lat, data.coord.lon)
            })
    }

    weatherButton.on('click', function () {
        // cityFinder is the name of the input box
        let searches = $('.cityFinder').val()
        // .trim()
        console.log(searches)

        getApi(searches);
        getfiveday();

    });

    introBtn.on('click', function () {
        $('.searchIntro').hide();
        let cSearch = $('.introInput').val().trim();
        // window.location("./assets/forecast.html")
        getApi(cSearch);
        getfiveday();
        // $('forecast.html').show();

        // cSearch.hide()
        // console.log(cSearch)
        // citySearch()
        // getfiveday(cSearch);

        // tl.to('.searchIntro', {y:'0%', duration: 1, stagger: 1});

})


    function getfiveday(lat, lon) {
        // where the api is being fetched from
        let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=9c15991b27b985193a8286709e2840d9&units=imperial`
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                console.log(data);
                for (let i = 1; i < 6; i++) {
                    let fivedaytemp = $("<div>").text(Math.round(data.daily[i].temp.day) + String.fromCharCode(176));
                    $('.future-conditions').append(fivedaytemp)
                }
            })
    }
})
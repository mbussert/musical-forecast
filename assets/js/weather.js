$(document).ready(function () {

    let weatherButton = $('#finder-btn');
    let introBtn = $('#introButton');
    recentSearches();

    function recentSearches() {
        recent = JSON.parse(localStorage.getItem('recent') || '[]');

        for (let i = 0; i < recent.length; i++) {
            let search = $('<div class="cities">').text(recent[i]);

            $('#recentSearches').append(search);
        }
    }

    function clearWeather() {
        $('#current-condition').empty();
        $('#future-conditions').empty();
    }

    $('.cities').on('click', function (event) {
        getApi(event.target.outerText);
    })

    // function that fetches api 
    function getApi(name) {
        let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=9c15991b27b985193a8286709e2840d9&units=imperial'
        if (!name) {
            return
        }
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

                weatherDesc = data.weather[0].description;
                console.log(weatherDesc);

                $('.current-condition').empty();
                $('.current-condition').append(city, temp.append(icon), high, low)

                getfiveday(data.coord.lat, data.coord.lon)

            });
    }

    weatherButton.on('click', function () {
        clearWeather();
        
        // cityFinder is the name of the input box
        let searches = $('#cityFinder').val().trim();
        // .trim()
        // console.log(searches)
        // alert()

        getApi(searches);
        // getfiveday();
        recent = JSON.parse(localStorage.getItem('recent') || '[]');
        if (!recent.includes(searches)) {
            recent.push(searches)

            let cities = $('<div>').text(searches);
            $('#recent-searches').append(cities);
        }
        localStorage.setItem('recent', JSON.stringify(recent));

    });

    introBtn.on('click', function () {
        // $('.searchIntro').hide();
        let cSearch = $('.introInput').val().trim();
        // window.location("./assets/forecast.html")
        getApi(cSearch);
        // getfiveday();
        // $('./assets/forecast.html').show();
        recent = JSON.parse(localStorage.getItem('recent') || '[]');
        if (!recent.includes(cSearch)) {
            recent.push(cSearch)

            let cities = $('<div>').text(cSearch);
            $('#recent-searches').append(cities);
        }
        localStorage.setItem('recent', JSON.stringify(recent));

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

                // $('#currentCard').empty();

                for (let i = 1; i < 6; i++) {
                    let day = new Date(data.daily[i].dt * 1000);
                    let date = $('<span class="day">').text(day.toDateString());
                    let fivedaytemp = $("<div>").text(Math.round(data.daily[i].temp.day) + String.fromCharCode(176));
                    let icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png')
                   
                    $('.future-conditions').append(date, icon, fivedaytemp)
                }
            })
    }
})
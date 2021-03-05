$(document).ready(function() {
    let weatherButton = $('.finder-btn');

    function getApi(name) {
        let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=9c15991b27b985193a8286709e2840d9&units=imperial'
   
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            let city = $('<div>').text(data.name);
            let temp = $('<div>').text(Math.round(data.main.temp) + String.fromCharCode(176));
            let high = $('<div>').text(data.main.temp_max);
            let low = $('<div>').text(data.main.temp_min)

            $('.home').attr('style', 'border: 2px solid black')
            $('.current-condition').append(city, temp, high, low)
        })
    }

    weatherButton.on('click', function() {
        let searches = $('.text').val().trim()
        getApi(searches);
    })
    
})
$(document).ready(function() {
    let weatherButton = $('.finder-btn');

    function getApi(name) {
        let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=9c15991b27b985193a8286709e2840d9&units=imperial'
//    debugger
// console.log(name)
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            let city = $('<div>').text(data.name);
            let temp = $('<div>').text(Math.round(data.main.temp) + String.fromCharCode(176));
            let high = $('<div>').text('High of ' + (data.main.temp_max) + String.fromCharCode(176));
            let low = $('<div>').text('Low of ' + (data.main.temp_min) + String.fromCharCode(176))

            // $('.home').attr('style', 'border: 2px solid black')
            $('.current-condition').append(city, temp, high, low)
        })
    }

    weatherButton.on('click', function() {
        let searches = $('.cityFinder').val().trim()
        console.log(searches)
        getApi(searches);
        
    })
    
})
var apiKey = '1907264457499489c3984f23a366b7ad';
var city = document.getElementById('cityInput');
var searchButton = document.getElementById('search-button');
var searchList = document.getElementById('codes');
var lat;
var lon;
var searchHistory = [];
var weatherData = [];
// var icon;
// var iconURL = 'http://openweathermap.org/img/w/' + icon + '.png';




function getCities() {
    var citySearch = city.value.trim();
    var geoSearchURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=1&appid=' + apiKey;
    console.log(citySearch);
    fetch(geoSearchURL)
        .then(function (response) {
            console.log(response)
            response.json().then(function (data) {
                console.log(data);
                lat = data[0].lat.toString();
                lon = data[0].lon.toString();
                searchHistory.splice(0, 0, data[0].name);
                console.log(searchHistory);
                new newWeatherPost(lat, lon);
            }
            )
        })
}

function newWeatherPost(coor1, coor2) {
    var weatherSearchURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coor1 + '&lon=' + coor2 + '&units=imperial&appid=' + apiKey;
    fetch(weatherSearchURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data.list);
                // Store Weather Data
                // weatherData = []
                // for (i = 0; data.list.length; i++) {
                //     var arry = data.list[i].split(' ')
                //     if (arry[1] == '12:00:00') {
                //         weatherData.push(data.list[i])
                //         console.log(weatherData);
                //     }
                // }
            })
        })
}

searchButton.addEventListener("click", getCities);
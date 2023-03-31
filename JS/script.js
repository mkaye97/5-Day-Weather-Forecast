var apiKey = '1907264457499489c3984f23a366b7ad';
var city = document.getElementById('cityInput');

var forecastCity = document.getElementById('city-name');
var searchButton = document.getElementById('search-button');
var searchList = document.getElementById('codes');
var forecast = document.getElementById('forecast');
var days = document.getElementsByClassName('date');
var icon = document.getElementsByClassName('icon');
var temp = document.getElementsByClassName('temp');
var wind = document.getElementsByClassName('wind');
var humidity = document.getElementsByClassName('humid');

var lat;
var lon;

var searchHistory = [];
var weatherData = [];

// var icon;
var iconURL = 'http://openweathermap.org/img/w/' + icon + '.png';




function getCities() {
    var citySearch = city.value.trim();
    var geoSearchURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=1&appid=' + apiKey;
    fetch(geoSearchURL)
        .then(function (response) {
            response.json().then(function (data) {
                lat = data[0].lat.toString();
                lon = data[0].lon.toString();
                searchHistory.splice(0, 0, data[0].name);
                console.log(searchHistory);
                new newWeatherPost(lat, lon);
            }
            )
        });
};

function newWeatherPost(coor1, coor2) {
    var weatherSearchURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coor1 + '&lon=' + coor2 + '&units=imperial&appid=' + apiKey;
    fetch(weatherSearchURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                
                // cityName.innerHTML = data.city.name;
                console.log('HERE');
                weatherData = []
                for (var i = 0; i < data.list.length; i++) {
                    var arry = data.list[i].dt_txt.split(' ')
                    if (arry[1] == '12:00:00') {
                        weatherData.push(data.list[i])
                    }
                }
                console.log(weatherData);
                forecastCity.textContent = data.city.name + ', ' + data.city.country;
                for (var i=0; i < weatherData.length; i++) {
                    var workingDate = weatherData[i].dt_txt.split(' ')
                    days[i].textContent = workingDate[0];
                    icon[i].src = 'http://openweathermap.org/img/w/' + weatherData[i].weather[0].icon + '.png';
                    icon[i].alt = weatherData[i].weather[0].main;
                    temp[i].textContent = weatherData[i].main.temp + '°F';
                    wind[i].textContent = weatherData[i].wind.speed + ' MPH';
                    humidity[i].textContent = weatherData[i].main.humidity + '% Humidity';
                }
            })
        });
};

searchButton.addEventListener("click", getCities);
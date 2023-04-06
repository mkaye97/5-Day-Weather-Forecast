var apiKey = '1907264457499489c3984f23a366b7ad';
var city = document.getElementById('cityInput');

var forecastCity = document.getElementById('city-name');
var searchButton = document.getElementById('search-button');
var searchList = document.getElementById('codes');
var forecast = document.getElementById('forecast');
var currContainer = document.getElementById('curr-container');
var currIcon = document.getElementById('icon-now');
var currTemp = document.getElementById('temp-now');
var currWind = document.getElementById('wind-now');
var currHumidity = document.getElementById('humid-now');
var days = document.getElementsByClassName('date');
var icon = document.getElementsByClassName('icon');
var temp = document.getElementsByClassName('temp');
var wind = document.getElementsByClassName('wind');
var humidity = document.getElementsByClassName('humid');
var historyName = document.getElementsByClassName('hist-name');
var historyButtons = document.getElementsByClassName('hist-card');

var lat;
var lon;

var searchHistory = localStorage.getItem('Search History');
var weatherData = [];
console.log(searchHistory);

function getCities() {
    var citySearch = city.value.trim();
    var geoSearchURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=1&appid=' + apiKey;
    fetch(geoSearchURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                lat = data[0].lat.toString();
                lon = data[0].lon.toString();
                console.warn("Get Cities Triggered");
                newWeatherPost(lat, lon);
                setHistory(data[0].name);
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
                currIcon.src = 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
                currIcon.alt = data.list[0].weather[0].main;
                currTemp.textContent = data.list[0].main.temp + '°F';
                currWind.textContent = data.list[0].wind.speed + ' MPH';
                currHumidity.textContent = data.list[0].main.humidity + '% Humidity';
                currContainer.classList.remove('invisible');
                weatherData = []
                for (var i = 0; i < data.list.length; i++) {
                    var arry = data.list[i].dt_txt.split(' ')
                    if (arry[1] == '12:00:00') {
                        weatherData.push(data.list[i])
                    }
                }
                console.log(weatherData);
                forecastCity.textContent = data.city.name + ', ' + data.city.country;
                for (var i = 0; i < weatherData.length; i++) {
                    var workingDate = weatherData[i].dt_txt.split(' ');
                    forecast.classList.remove('invisible');
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

function setHistory(name) {
    if (searchHistory === null) {
        searchHistory = name;
        console.warn("Set History Triggered");
        localStorage.setItem('Search History', searchHistory);
        appendHistory();
    } else {
        searchHistory = name + ', ' + searchHistory;
        localStorage.setItem('Search History', searchHistory);
        console.warn("Set History Triggered");
        appendHistory();
    };
};

function appendHistory() {
    console.warn("Append History Triggered");
    if (searchHistory == null) {
        console.log('No search history.');
    } else if (searchHistory.split(' ').length === 1) {
        historyName[0].textContent = searchHistory;
        historyButtons[0].classList.remove('invisible');
        historyButtons[0].addEventListener("click", function (event) {
            historySearch(event.target.textContent);
        });
    } else if (searchHistory.split(', ').length < 10) {
        var appendList = searchHistory.split(', ');
        for (var i = 0; i < appendList.length; i++) {
            historyName[i].textContent = appendList[i];
            historyButtons[i].classList.remove('invisible');
            historyButtons[i].addEventListener("click", function (event) {
                historySearch(event.target.textContent);
            });
        }
    } else {
        var appendList = searchHistory.split(', ');
        for (var i = 0; i < 10; i++) {
            historyName[i].textContent = appendList[i];
            historyButtons[i].classList.remove('invisible');
            console.log(appendList[i]);
            historyButtons[i].addEventListener("click", function (event) {
                console.warn('Warn Here');
                historySearch(event.target.textContent);
            });
        }
    }
};

function historySearch(histCity) {
    var geoSearchURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + histCity + '&limit=1&appid=' + apiKey;
    fetch(geoSearchURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                lat = data[0].lat.toString();
                lon = data[0].lon.toString();
                newWeatherPost(lat, lon);
            }
            )
        });
};

appendHistory();

searchButton.addEventListener("click", getCities);


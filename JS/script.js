var apiKey = '60c3eea7f8396024e6ea304c296ccf7a';
var city = document.getElementById('cityInput');
var searchButton = document.getElementById('search-button');
var lat = '33.71745'
var lon = '18.9963167'
var geoSearchURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;
var geoSearchTest = 'https://api.openweathermap.org/geo/1.0/direct?q=chicago&limit=5&appid=60c3eea7f8396024e6ea304c296ccf7a'
var weatherSearchTest = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.71745&lon=18.9963167&appid=60c3eea7f8396024e6ea304c296ccf7a'
var weatherSearchURL = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;



function getLatLon() {
    var citySearch = city.value.trim();
    console.log(citySearch);
    fetch(geoSearchTest)
    .then(function(response) {
            console.log(response)
            response.json().then(function(data) {
                console.log(data)
                // Add in pushing coordinates into local storage
            })
    })
};

// function weatherPost() {
//     // var lat = localStorage.getItem("citylat")
//     // var lon = localStorage.getItem("citylon")

//     fetch(weatherSearchTest)
//     .then(function(response) {
//             console.log(response)
//             response.json().then(function(data) {
//                 console.log(data)
//             })
//     })
// }

searchButton.addEventListener("click", getLatLon);
var apiKey = '60c3eea7f8396024e6ea304c296ccf7a'
var city = document.getElementById('cityInput');
var searchButton = document.getElementById('search-button');
var latSearch;
var lonSearch;
var lat = '33.71745'
var lon = '18.9963167'
var geoSearchTest = 'https://api.openweathermap.org/geo/1.0/direct?q=chicago&limit=5&appid=60c3eea7f8396024e6ea304c296ccf7a'
var weatherSearchTest = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.71745&lon=18.9963167&appid=60c3eea7f8396024e6ea304c296ccf7a'
var weatherSearchURL = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;



function getLatLon() {
    var citySearch = city.value.trim();
    var geoSearchURL = 'https://api.openweathermap.org/geo/1.0/direct?q='+citySearch+'&limit=5&appid='+apiKey;
    console.log(citySearch);
    fetch(geoSearchURL)
    .then(function(response) {
        console.log(response)
        response.json().then(function(data) {
        console.log(data);
        console.log(data.length);
        console.log(data[0].state);
        console.log(data[0].country);
        latSearch = data[0].lat;
        lonSearch = data[0].lon;
        weatherPost()
        })
    })
};

function weatherPost() {
    

    fetch(weatherSearchTest)
    .then(function(response) {
            console.log(response)
            response.json().then(
                function(data) {
                console.log(data)
                
            })
    })
}

searchButton.addEventListener("click", getLatLon);

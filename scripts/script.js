
//below function saves a list of searched cities in localStorage
function saveCity() {
    var city = $("#cityInput").val().trim();
    pastSavedCities = localStorage.getItem("savedCities");
    if(pastSavedCities == null) {
        localStorage.setItem("savedCities", city);
    } else {
    newSavedCities = pastSavedCities + "," + city;
    localStorage.setItem("savedCities", newSavedCities);}
    $("#citiesSearched").append("<p>Past searches: " + localStorage.getItem("savedCities") + "</p>");
    //and adds the saved city to the Search History buttons
    $("#citiesSearched").empty();
    var arrSearchHistory = localStorage.getItem("savedCities").split(",");
    //below line removes duplicates from Search History
    let arrCleanSearch = [...new Set(arrSearchHistory)];
    console.log(arrCleanSearch);
    for(i=0;i<arrCleanSearch.length;i++){
        console.log(arrCleanSearch[i]);
        $("#citiesSearched").append("<button value='" + arrCleanSearch[i] + "' onclick='historyClick(this.value)'>" + arrCleanSearch[i] + "</button>");
    }
}

//In the Search History each button can be clicked which triggers the below function, showing that city's weather forecast
function historyClick(val) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + val + ",us&units=imperial&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        method: "GET"
    }) .then(function(response) {
        $("#currentCityWeather").empty();
        $("#currentCityWeather").append("<p>" + response.name + "</p>")
        .append("<p>Date: " + (new Date(response.dt * 1000).toUTCString()) + "</p>")
        .append("<p>" + response.weather[0].description + " " + "<img src=http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png alt='Weather Icon Here'></p>")
        .append("<p>Temperature: " + response.main.temp + " degrees Fahrenheit</p>")
        .append("<p>Humidity: " + response.main.humidity + "%</p>")
        .append("<p>Wind Speed: " + response.wind.speed + " mph</p>");
        lon = response.coord.lon;
        lat = response.coord.lat;
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=52f8ba8465b83eb0e9c8d13385d0ea14&lat=" + lat + "&lon=" + lon,
            method: "GET"
        }) .then(function(response) {
            $("#currentCityWeather").append("<p>UV Index: " + response.value + "</p>");
        })
    })
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + val + ",us&units=imperial&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        method: "GET"
    }) .then(function(response) {
        //Grabs the weather snapshot for noon of each day because every item in array is a 3 hour forecast
        $("#day1").empty();
        $("#day1").append("<p>" + (new Date(response.list[2].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[2].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[2].main.humidity + "</p>");
        $("#day2").empty();
        $("#day2").append("<p>" + (new Date(response.list[10].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[10].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[10].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[10].main.humidity + "</p>");
        $("#day3").empty();
        $("#day3").append("<p>" + (new Date(response.list[18].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[18].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[18].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[18].main.humidity + "</p>");
        $("#day4").empty();
        $("#day4").append("<p>" + (new Date(response.list[26].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[26].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[26].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[26].main.humidity + "</p>");
        $("#day5").empty();
        $("#day5").append("<p>" + (new Date(response.list[34].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[34].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[34].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[34].main.humidity + "</p>");
    });
}

//below function gets weather info for city typed into the search bar
function citySearchButton() {
    var city = $("#cityInput").val();
    var lat = 0;
    var lon = 0;
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&units=imperial&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        method: "GET"
    }) .then(function(response) {
        $("#currentCityWeather").empty();
        $("#currentCityWeather").append("<p>" + response.name + "</p>")
        .append("<p>Date: " + (new Date(response.dt * 1000).toUTCString()) + "</p>")
        .append("<p>" + response.weather[0].description + " " + "<img src=http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png alt='Weather Icon Here'></p>")
        .append("<p>Temperature: " + response.main.temp + " degrees Fahrenheit</p>")
        .append("<p>Humidity: " + response.main.humidity + "%</p>")
        .append("<p>Wind Speed: " + response.wind.speed + " mph</p>");
        lon = response.coord.lon;
        lat = response.coord.lat;
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=52f8ba8465b83eb0e9c8d13385d0ea14&lat=" + lat + "&lon=" + lon,
            method: "GET"
        }) .then(function(response) {
            $("#currentCityWeather").append("<p>UV Index: " + response.value + "</p>");
        })
    })
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&units=imperial&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        method: "GET"
    }) .then(function(response) {
        //Grabs the weather snapshot for noon of each day because every item in array is a 3 hour forecast
        $("#day1").empty();
        $("#day1").append("<p>" + (new Date(response.list[2].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[2].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[2].main.humidity + "</p>");
        $("#day2").empty();
        $("#day2").append("<p>" + (new Date(response.list[10].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[10].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[10].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[10].main.humidity + "</p>");
        $("#day3").empty();
        $("#day3").append("<p>" + (new Date(response.list[18].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[18].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[18].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[18].main.humidity + "</p>");
        $("#day4").empty();
        $("#day4").append("<p>" + (new Date(response.list[26].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[26].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[26].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[26].main.humidity + "</p>");
        $("#day5").empty();
        $("#day5").append("<p>" + (new Date(response.list[34].dt * 1000).toUTCString()) + "</p>")
        .append("<img src=http://openweathermap.org/img/wn/" + response.list[34].weather[0].icon + "@2x.png alt='Weather Icon Here'>")
        .append("<p>Temperature: " + response.list[34].main.temp + "</p>")
        .append("<p>Humidity: " + response.list[34].main.humidity + "</p>");
    });
}



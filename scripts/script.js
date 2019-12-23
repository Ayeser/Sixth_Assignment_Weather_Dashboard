
function saveCity() {
    var city = $("#cityInput").val();
    pastSavedCities = localStorage.getItem("savedCities");
    if(pastSavedCities == null) {
        console.log("It was null!");
        localStorage.setItem("savedCities", city);
    } else {
    newSavedCities = pastSavedCities + ", " + city;
    localStorage.setItem("savedCities", newSavedCities);
    console.log(newSavedCities);}
    $("#citiesSearched").empty();
    $("#citiesSearched").append("<p>Past searches: " + localStorage.getItem("savedCities") + "</p>");
}

function citySearchButton() {
    var city = $("#cityInput").val();
    console.log(city);
    $.ajax({
        // url: "api.openweathermap.org/data/2.5/weather?q=" + city + ",us&mode=json&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        url: "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        method: "GET"
    }) .then(function(response) {
        $("#currentCityWeather").append("<p>City's name: " + response.name + "</p>")
        .append("<p>Temperature: " + response.main.temp + "</p>")
        .append("<p>Humidity: " + response.main.humidity + "</p>")
        .append("<p>Wind Speed: " + response.wind.speed + "</p>")
        console.log(response);
    })
    $.ajax({
        // url: "https://www.api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&mode=json&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        url: "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        method: "GET"
    }) .then(function(response) {
        console.log(response);
$("card-text5").append("<p>" + JSON.stringify(response) + "</p>");
    })
}



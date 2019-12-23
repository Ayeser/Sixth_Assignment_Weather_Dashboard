
function saveCity() {
    // $("#citiesSearched").empty();
    // Keep these saved cities in localStorage so persists through page resets
    $("#citiesSearched").prepend("<p>" + city + "</p>");
}

function citySearchButton() {
    var city = $("#cityInput").val();
    console.log(city);
    $.ajax({
        url: "api.openweathermap.org/data/2.5/weather?q=" + city + ",us&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        method: "GET"
    }) .then(function(response) {
        $("#currentCityWeather").append("<p>City's name: " + response.name + "</p>")
        append("<p>Temperature: " + response.main.temp + "</p>")
        append("<p>Humidity: " + response.main.humidity + "</p>")
        append("<p>Wind Speed: " + response.wind.speed + "</p>")
        console.log(response);
    })
    $.ajax({
        url: "api.openweathermap.org/data/2.5/forecast?q=" + city + "us&mode=json&appid=52f8ba8465b83eb0e9c8d13385d0ea14",
        method: "GET"
    }) .then(function(response2) {
        console.log(response2);
$("card-text5").append(JSON.stringify(response2))
    })
    saveCity();
}



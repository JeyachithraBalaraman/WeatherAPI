

const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/",
    units: "metric"
}
// Display by default The weather report of New Delhi
getResults('New Delhi');

const searchbox = document.querySelector('#search-box');

searchbox.addEventListener('keypress', setQuery);
// if enter key is pressed the City name is taken 

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}
// Get Results from API
function getResults(cityName) {
    const url = `${api.base}weather?q=${cityName}&units=${api.units}&appid=${api.key}`;
    // fetch url
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            displayResults(responseJson);
        })
        .catch((error) =>
            alert("Enter valid city", error)
        );
}
// Display results
function displayResults(responseJson) {
    console.log(responseJson);
    let city = document.querySelector(".city");
    city.innerText = `${responseJson.name},${responseJson.sys.country}`;

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(responseJson.main.temp)}°c`;

    let weather = document.querySelector(".weather");
    weather.innerHTML = `${responseJson.weather[0].main}`;

    let hilow = document.querySelector(".hi-low");
    hilow.innerHTML = `${responseJson.main.temp_min}°c / ${responseJson.main.temp_max}°c`;

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = dateBuilder(now);

}
// dateBuilder
function dateBuilder(date) {
    const dateOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long'
    };
    return date.toLocaleDateString("en-US", dateOptions);
}

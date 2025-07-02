const apiKey = '3b5b2584d6f96ac140cb7498f861a3e6';

function getWeather() {
    const city = cityName();
    const url = apiUrl(city);
    fetchWeather(url);
}

function cityName() {
    const input = document.querySelector('#cityInput').value;
    let city = input.trim();
    if(!city) {
        alert('Please enter a city name');
        return null;
    }
    input.value = '';
    return city;
}
function apiUrl(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
}

function fetchWeather() {
    const city = cityName();
    if (!city) return;

    const url = apiUrl(city);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}
function displayWeather(data) {
    const weatherResult = document.querySelector('.weatherResult');
    weatherResult.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}"></p>
    `;
}

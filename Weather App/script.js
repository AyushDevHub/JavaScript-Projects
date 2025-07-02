const apiKey = '3b5b2584d6f96ac140cb7498f861a3e6';

function getWeather() {
    const city = cityName();
    const url = apiUrl(city);
    fetchWeather(url);
}

function cityName() {
    const input = document.querySelector('#cityInput');
    let city = input.value.trim();
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

function fetchWeather(url) {
    const loader = document.getElementById('loader');
    const result = document.querySelector('.weatherResult');

    loader.style.display = 'block';     // Show loader
    result.innerHTML = '';              // Clear old result

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
        })
        .finally(() => {
            loader.style.display = 'none';  // Hide loader after fetch
        });
}

function displayWeather(data) {
    const weatherResult = document.querySelector('.weatherResult');
    const condition = data.weather[0].description.toLowerCase();
    setBackground(condition);
    const favicon = document.getElementById('favicon');
    const iconCode = data.weather[0].icon;
    favicon.href = `https://openweathermap.org/img/wn/${iconCode}.png`;

    weatherResult.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}"></p>
    `;
}

function setBackground(condition) {
    const body = document.body;

    if (condition.includes("cloud")) {
        body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
        body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
    } else if (condition.includes("clear")) {
        body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
    } else if (condition.includes("snow")) {
        body.style.background = "linear-gradient(to right, #e6dada, #274046)";
    } else if (condition.includes("thunder")) {
        body.style.background = "linear-gradient(to right, #232526, #414345)";
    } else if (condition.includes("mist") || condition.includes("fog")) {
        body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
    } else {
        body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    }
}

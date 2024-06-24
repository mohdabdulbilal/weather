async function getWeather() {
    const city = document.getElementById('city').value;
    const api = "b4abf340a3c96d634fba9510c199548d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('Error fetching weather data');
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <div class="weather-info">
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;

    // Additional logic for specific weather conditions
    if (data.weather[0].main === 'Clear') {
        document.body.style.background = '#FFD700'; // Clear sky background
    } else if (data.weather[0].main === 'Clouds') {
        document.body.style.background = '#B0C4DE'; // Cloudy background
    } else if (data.weather[0].main === 'Rain') {
        document.body.style.background = '#00CED1'; // Rainy background
    } else {
        document.body.style.background = '#f0f0f0'; // Default background
    }
}

function showError(message) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `<p class="error">${message}</p>`;
}

getWeather()
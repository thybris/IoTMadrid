document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var city = document.getElementById('cityInput').value;

    // Fetch weather data
    fetch('/get_weather?city=' + city)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherData').innerText = 'Failed to load weather data';
        });

    // Fetch sensor data
    fetch('/get_sensor_data')
        .then(response => response.json())
        .then(sensorData => {
            renderSensorData(sensorData);
        })
        .catch(error => {
            console.error('Error fetching sensor data:', error);
            // Handle the error as needed
        });

    // Fetch forecast data
    getForecast(city);
});

function displayWeatherData(data) {
    console.log('Weather Data:', data);  // Log the received data

    if (data.cod !== 200) {
        document.getElementById('weatherData').innerText = 'Weather data not found';
        return;
    }

    // Rest of the function remains the same
    document.getElementById('weatherLocation').textContent = `Weather in ${data.name}, ${data.sys.country}`;
    document.getElementById('weatherDescription').textContent = `${data.weather[0].main} (${data.weather[0].description})`;
    document.getElementById('weatherTemperature').textContent = `Temperature: ${data.main.temp.toFixed(2)}°C`;
    document.getElementById('weatherHumidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('weatherWind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}


function renderSensorData(sensorData) {
    document.getElementById('sensorTemperature').textContent = `Temperature: ${sensorData.temperature} °C`;
    document.getElementById('sensorHumidity').textContent = `Humidity: ${sensorData.humidity} %`;
    // Update other sensor data fields as needed
}

function getForecast(city) {
    // Fetch forecast data
    fetch('/get_forecast?city=' + city)
        .then(response => response.json())
        .then(data => {
            renderForecastChart(data);
        })
        .catch(error => console.error('Error fetching forecast data:', error));
}

function renderForecastChart(forecastData) {
    const labels = forecastData.list.map(item => new Date(item.dt * 1000).toLocaleTimeString());
    const temps = forecastData.list.map(item => item.main.temp);

    const ctx = document.getElementById('forecastChart').getContext('2d');
    if (window.myForecastChart) {
        window.myForecastChart.destroy();
    }
    window.myForecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

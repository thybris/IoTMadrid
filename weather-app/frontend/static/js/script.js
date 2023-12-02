document.getElementById('weatherForm').addEventListener('submit', function(event){
    event.preventDefault();
    var city = document.getElementById('cityInput').value;
    fetch('/get_weather?city=' + city)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            getForecast(city);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weatherData').innerText = 'Failed to load weather data';
        });
});

function displayWeatherData(data) {
    if (data.cod !== 200) {
        document.getElementById('weatherData').innerText = 'Weather data not found';
        return;
    }
    document.getElementById('weatherLocation').textContent = `Weather in ${data.name}, ${data.sys.country}`;
    document.getElementById('weatherDescription').textContent = `${data.weather[0].main} (${data.weather[0].description})`;
    document.getElementById('weatherTemperature').textContent = `Temperature: ${data.main.temp.toFixed(2)}°C`;
    document.getElementById('weatherHumidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('weatherWind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function getForecast(city) {
    fetch('/get_forecast?city=' + city)
        .then(response => response.json())
        .then(data => {
            renderForecastChart(data);
        })
        .catch(error => console.error('Error:', error));
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

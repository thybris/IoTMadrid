document.getElementById('weatherForm').addEventListener('submit', function(event){
    event.preventDefault();
    var city = document.getElementById('cityInput').value;
    fetch('/get_weather?city=' + city)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weatherResult').innerText = 'Failed to load weather data';
        });
});

function displayWeatherData(data) {
    if (data.cod !== 200) {
        document.getElementById('weatherResult').innerText = 'Weather data not found';
        return;
    }

    const weatherContent = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${(data.main.temp - 273.15).toFixed(2)}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    document.getElementById('weatherResult').innerHTML = weatherContent;
}

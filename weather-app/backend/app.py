from flask import Flask, render_template, request, jsonify
import requests
import random

app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')

API_KEY = 'eadcae6451abb11beffed9dc638dcac3'
WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"

def get_sensor_data():
    temperature = 24  # round(random.uniform(20, 30), 2)
    humidity = 12  # round(random.uniform(40, 60), 2)
    return {'temperature': temperature, 'humidity': humidity}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_weather', methods=['GET'])
def get_weather():
    city_name = request.args.get('city')
    params = {
        'q': city_name,
        'appid': API_KEY,
        'units': 'metric'
    }
    response = requests.get(WEATHER_URL, params=params)
    return jsonify(response.json())

@app.route('/get_sensor_data', methods=['GET'])
def get_sensor_data_route():
    sensor_data = get_sensor_data()
    return jsonify(sensor_data)

@app.route('/get_forecast', methods=['GET'])
def get_forecast():
    city_name = request.args.get('city')
    params = {
        'q': city_name,
        'appid': API_KEY,
        'units': 'metric'
    }
    response = requests.get(FORECAST_URL, params=params)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)

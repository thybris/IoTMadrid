from flask import Flask, render_template, request, jsonify
import requests

# Set up Flask app with references to the frontend folder structure
app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')


API_KEY = "eadcae6451abb11beffed9dc638dcac3"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_weather', methods=['GET'])
def get_weather():
    city_name = request.args.get('city')
    params = {
        'q': city_name,
        'appid': API_KEY
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

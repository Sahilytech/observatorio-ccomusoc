from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def parse_data(url):
    # Esto es un ejemplo genérico
    # Para cada URL oficial se puede hacer un scraper específico o usar API si existe
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Dummy data de ejemplo
    bar = {
        "label": "Ingresos Mensuales",
        "labels": ["Enero", "Febrero", "Marzo", "Abril"],
        "values": [1000, 1200, 900, 1300],
        "source": url
    }
    pie = {
        "label": "Distribución por Sector",
        "labels": ["Salud", "Educación", "Transporte", "Otros"],
        "values": [25, 35, 15, 25],
        "source": url
    }
    return {"bar": bar, "pie": pie}

@app.route('/fetch-data')
def fetch_data():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    data = parse_data(url)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

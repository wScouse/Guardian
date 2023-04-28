# Add detection data to database

from flask import Flask, request, session, jsonify
import mysql.connector
import random
import hashlib

app = Flask(__name__)

@app.route('/api/search_add', methods=['POST'])
def logDetection():
    id = request.json.get('id')
    print(id)
    name = request.json.get('name')
    print(name)
    capture_img = request.json.get('capture')
    print(capture_img)

    return jsonify({'status': 'success'})

# Analyse emotion of person in image to assign threat level.


# Update threatActual in database for missing ID.

# Save data to detections table.
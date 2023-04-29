# This API handles the reporting of missing people.

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/report_missing', methods=['POST'])
def reportMissing():
    data = request.get_json()
    # print(data)

    return jsonify({'success': True})
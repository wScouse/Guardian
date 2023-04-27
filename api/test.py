# Test Connections

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/test', methods=['POST'])
def Hello():
    print("Hello World")
    return jsonify({'success': True})
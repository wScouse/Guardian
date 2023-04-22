# Logout functionality for Guardian

from flask import Flask, request, session, jsonify
import hashlib
import mysql.connector
from flask_jwt_extended import create_access_token

app = Flask(__name__)
@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('email', None)
    return jsonify({'success': True})
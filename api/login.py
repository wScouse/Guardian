# Login functionality for Guardian

from flask import Flask, request, session, jsonify

app = Flask(__name__)
app.secret_key = 'secret'

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Validate Username and Password
    if username == 'admin' and password == 'admin':
        session['username'] = username
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 401
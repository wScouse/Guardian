# Login functionality for Guardian

from flask import Flask, request, session, jsonify

app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    print(email)
    password = request.json.get('password')
    print(password)

    # Validate Username and Password
    if email == 'admin@admin.com' and password == 'admin':
        session['email'] = email
        return jsonify({'success': True})
    else:
        return jsonify({'success': False}), 401
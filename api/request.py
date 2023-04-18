# Request Access function for Guardian

from flask import Flask, request, session, jsonify

app = Flask(__name__)

@app.route('/api/request', methods=['POST'])
def requestAccess():
    email = request.json.get('email')
    print(email)

    emails = ['admin@admin.com']

    # Check if email has been used already
    if email in emails:
        return jsonify({'success': False}), 401
    else:
        emails.append(email)
        return jsonify({'success': True})

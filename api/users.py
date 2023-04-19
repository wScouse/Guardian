# This API retrieves data from the requests database.

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/users')
def getUsers():
    # Connect to database
    userDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    cursor = userDB.cursor()
    # Check current count
    cursor.execute("SELECT userID, userEMAIL FROM user_data")

    # Fetch all
    rows = cursor.fetchall()

    # Convert rows to dictionary
    data = []
    for row in rows:
        dict_row = {'id': row[0], 'email': row[1]}
        data.append(dict_row)

    cursor.close()
    userDB.close()

    # Return data as JSON
    return jsonify(data)
# This API retrieves data from the requests database.

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/requests')
def getData():
    # Connect to database
    emailDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    cursor = emailDB.cursor()
    # Check current count
    cursor.execute("SELECT requestID, requestEMAIL, requestDATE FROM user_requests")

    # Fetch all
    rows = cursor.fetchall()

    # Convert rows to dictionary
    data = []
    for row in rows:
        dict_row = {'id': row[0], 'email': row[1], 'date': row[2]}
        data.append(dict_row)

    cursor.close()
    emailDB.close()

    # Return data as JSON
    return jsonify(data)
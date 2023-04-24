# This API retrieves data from the detections database.

from flask import Flask, request, session, jsonify
import mysql.connector



app = Flask(__name__)


@app.route('/api/reports')
def getReports():
    # Connect to database
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    cursor.execute("SELECT missingID, missingNAME, threatESTIMATE, foundSTATUS FROM missing_people_data")

    # Fetch all
    rows = cursor.fetchall()

    # Convert rows to dictionary
    data = []
    for row in rows:
        dict_row = {'id': row[0], 'name': row[1], 'threat': row[2], 'found': row[3] }
        data.append(dict_row)


    cursor.close()
    dataDB.close()

    # print(data)

    # Return data as JSON
    return jsonify(data)

# This API retrieves data from the detections database.

from flask import Flask, request, session, jsonify
import mysql.connector



app = Flask(__name__)


@app.route('/api/detections')
def getDetections():
    # Connect to database
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    cursor.execute("SELECT detectionID, missingID, detectionDATE, detectionTHREAT FROM detection_data")

    # Fetch all
    rows = cursor.fetchall()

    # Convert rows to dictionary
    data = []
    for row in rows:
        dataID = row[1] # ID of Missing Person
        name = getDetails(dataID)
        dict_row = {'id': row[0], 'missing': row[1], 'date': row[2], 'name': name, 'threat': row[3]}
        data.append(dict_row)


    cursor.close()
    dataDB.close()

    # Return data as JSON
    return jsonify(data)

def getDetails(dataID):
    # Get the details of the missing person.
    # Connect to database
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    sql = "SELECT missingNAME FROM missing_people_data WHERE missingID = %s"
    cursor.execute(sql, (dataID,))

    # Fetch all
    rows = cursor.fetchall()
    # print(rows)

    name = rows[0][0]


    # print(name)

    return name
# API for home page

from flask import Flask, request, session, jsonify
import mysql.connector



app = Flask(__name__)


@app.route('/api/guardian')
def get_detections():
    # Connect to database
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    # Retrieve count of all detections
    cursor = dataDB.cursor()
    cursor.execute("SELECT COUNT(*) FROM detection_data")
    count = cursor.fetchone()[0]

    # retrieve most recent 5 entries
    cursor.execute("SELECT * FROM detection_data ORDER BY detectionDATE DESC LIMIT 5")
    detections = cursor.fetchall()

    print(detections)

    # build response object
    response = {
        'count': count,
        'detections': []
    }

    for detection in detections:
        detection_dict = {
            'id': detection[0],
            'missingID': detection[1],
            'detectionDATE': detection[2],
            'detectionLOCATION': detection[3],
            'detectionCAPTURE': detection[4],
            'detectionTHREAT': detection[5]
        }
        print(detection_dict)
        response['detections'].append(detection_dict)
        print(response)

    cursor.close()
    dataDB.close()

    return jsonify(response)
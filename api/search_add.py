# Add detection data to database

from flask import Flask, request, session, jsonify
import mysql.connector
import random
import hashlib
import os
from deepface import DeepFace
import datetime

app = Flask(__name__)

@app.route('/api/search_add', methods=['POST'])
def logDetection():
    id = request.json.get('id')
    # print(id)
    name = request.json.get('name')
    # print(name)
    location = request.json.get('location')
    # print(location)
    capture_img = request.json.get('capture')
    # print(capture_img)

    threat = analyse_image(capture_img)
    # print(threat)

    dataDate = datetime.datetime.now()
    # print(dataDate)

    filename = os.path.basename(capture_img)
    # print(filename)

    img_file = filename.split('.')[0]
    # print(img_file)

    setFound(id)

    saveDetection(id, name, location, dataDate, img_file, threat)

    return jsonify({'status': 'success'})

# Analyse emotion of person in image to assign threat level.
def analyse_image(new_filename):
    results = DeepFace.analyze(img_path = new_filename, actions = ['emotion'])
    # print(results)

    # Get dominant emotion
    emotion = results[0]['dominant_emotion']
    # print(emotion)

    # Assign threat level based on emotion
    highThreat = ["angry", "fear", "sad", "disgust"]
    mediumThreat = ["surprise"]
    lowThreat = ["happy", "neutral"]

    # Assign threat level
    if emotion in highThreat:
        print("High Threat Level!")
        threat = "high"
    elif emotion in mediumThreat:
        print("Medium Threat Level!")
        threat = "medium"
    elif emotion in lowThreat:
        print("Low Threat Level!")
        threat = "low"
    else:
        print("Error")

    return threat

# Update found status
def setFound(id):
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")


    # Get a cursor object
    cursor = dataDB.cursor()


    sql = "UPDATE missing_people_data SET foundSTATUS = %s WHERE missingID = %s"
    cursor.execute(sql, ("True", id,))
    
    dataDB.commit()

    dataDB.close()
    cursor.close()

# Save data to detections table.
def saveDetection(id, name, location, dataDate, capture_img, threat):
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    # Get a cursor object
    cursor = dataDB.cursor()

    try:
        # Execute the query
        cursor.execute(
            "INSERT INTO detection_data (missingID, detectionDATE, detectionLOCATION, detectionCAPTURE, detectionTHREAT) VALUES (%s, %s, %s, %s, %s)",
            (id, dataDate, location,  capture_img, threat),
        )

        # Get the KinID of the inserted row
        kinID = cursor.lastrowid

        # Commit transaction
        dataDB.commit()

        cursor.close()
        dataDB.close()

        return kinID

    except Exception as e:
        print("Error: ", e)
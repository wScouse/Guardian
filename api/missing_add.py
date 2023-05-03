# Add missing person report to database

from flask import Flask, request, session, jsonify
import mysql.connector
import os
import uuid
import matplotlib.pyplot as plt
from PIL import Image
from deepface import DeepFace
import datetime

app = Flask(__name__)

@app.route('/api/missing_add', methods=['POST'])
def new_missing():
    data = request.form.to_dict()
    # print(data)

    img = request.files.get('image')

    photo, threat = process_image(img)

    kinID = saveKin(data)
    
    saveReport(photo, threat, data, kinID)
    

    return jsonify({'success': True})

def process_image(img):
    # Process and Save Image
    # print(img)
    # print(type(img))

    filename = img.filename
    # print(filename)

    img_file = filename.split('.')[0]
    # print(img_file)

    img_type = filename.split('.')[-1]
    # print(img_type)

    # Generate random ID using UUID
    uniqueID = str(uuid.uuid4())
    # print("Unique ID: ", uniqueID)

    new_filename = os.path.join('C:/xampp/htdocs/Guardian/GuardianDB/', uniqueID + '.' + img_type)
    # print(new_filename)

    img.save(new_filename)

    # Delete detections file upon saving new image.
    os.remove('C:/xampp/htdocs/Guardian/GuardianDB/representations_vgg_face.pkl')

    # Run emotion recognition on image
    threat = analyse_image(new_filename)

    return uniqueID, threat

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

def saveKin(data):
    # Save the details for the kin.
    name = data.get('contactName')
    number = data.get('mobileNumber')
    email = data.get('email')

    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    # Get a cursor object
    cursor = dataDB.cursor()

    try:
        # Execute the query
        cursor.execute(
            "INSERT INTO kin_data (kinNAME, kinMOBILE, kinEMAIL) VALUES (%s, %s, %s)",
            (name, number, email),
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


    




def saveReport(photo, threat, data, kinID):
    first_name = data.get('firstname')
    last_name = data.get('lastname')
    age = data.get('age')
    gender = data.get('gender')
    location = data.get('location')
    additional_info = data.get('additionalInfo')

    name = first_name + " " + last_name

    print(kinID)

    dataDate = datetime.datetime.now()

    # Connect to database
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    # Get a cursor object
    cursor = dataDB.cursor()


    try:
        # Execute the query
        # Add data to database.
        sql = "INSERT INTO missing_people_data (missingNAME, missingAGE, missingGENDER, missingLOCATION, missingINFO, missingFROM, kinID, photoID, threatESTIMATE, foundSTATUS) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (name, age, gender, location, additional_info, dataDate, kinID, photo, threat, "False")
        cursor.execute(sql, val)

        caseID = cursor.lastrowid
        print(caseID)

        # Commit transaction
        dataDB.commit()

        cursor.close()
        dataDB.close()


    except Exception as e:
        print("Error: ", e)


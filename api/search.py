# This API uses DeepFace to compare the image in the request to the image in the database.

from flask import Flask, request, session, jsonify
import mysql.connector
import cv2
import matplotlib.pyplot as plt
from PIL import Image
import os
import uuid
from deepface import DeepFace
import shutil

app = Flask(__name__)

@app.route('/api/search')
def search():
    data = request.form.to_dict()
    print(data)

    img = request.files.get('image')

    print(img)

    tempID, img_type, detections =  process_image(img)

    temp_file = os.path.join('C:/xampp/htdocs/Guardian/temp/', tempID + '.' + img_type)

    if detections:
        print("Detections found")
        # save captured image to database.
        # Copy file to another directory
        dst_dir = 'C:/xampp/htdocs/Guardian/GuardianCaptures/'
        shutil.copy(temp_file, dst_dir)
        # Delete image from temp folder
        os.remove(temp_file)


        # The main image file
        capture = os.path.join('http://localhost/Guardian/GuardianCaptures/', tempID + '.' + img_type)

        # Emotion recognition

        # Fetch data and pass back to table.
        data = extractData(detections, capture)

    else:
        print("No matches found")
        # Delete image from temp folder
        os.remove(temp_file)


    return jsonify(data)

def process_image(img):
    # Process and Save Image
    print(img)
    print(type(img))

    filename = img.filename
    print(filename)

    img_file = filename.split('.')[0]
    print(img_file)

    img_type = filename.split('.')[-1]
    print(img_type)

    # Generate random ID using UUID
    uniqueID = str(uuid.uuid4())
    print("Unique ID: ", uniqueID)

    new_filename = os.path.join('C:/xampp/htdocs/Guardian/temp/', uniqueID + '.' + img_type)
    print(new_filename)

    img.save(new_filename)

    detections = analyse_image(new_filename)

    
    return uniqueID, img_type, detections

def analyse_image(new_filename):
    db_path = "C:/xampp/htdocs/Guardian/GuardianDB"

    results = DeepFace.find(img_path = new_filename, db_path = db_path, enforce_detection = False)

    print(results)

    detectionIDs = []

    index = 0

    while True:
        try:
            # print(result[0].iloc[index].identity)
            resultFile = results[0].iloc[index].identity

            # Get the image file
            file = resultFile.split("/")[-1]

            # Get the ID
            id = file.split(".")[0]

            print("Alert! Missing person identified! ID:", id)
            print("\n")

            detectionIDs.append(id)

            index += 1

        except IndexError:
            break

    print(detectionIDs)

    return detectionIDs

def extractData(detections, capture):
    # This function will extract the data from the database and pass it back to the table.

    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    data = []

    for detection in detections:

        try:

            cursor = dataDB.cursor()
            # Check current count
            sql = "SELECT missingID, missingNAME, threatESTIMATE FROM missing_people_data WHERE photoID = %s"
            cursor.execute(sql, (detection,))

        
            row = cursor.fetchone()

            detection_image = os.path.join('http://localhost/Guardian/GuardianDB/', detection + '.jpg')

            
            dict_row = {'ID' : row[0], 'Name': row[1], 'Estimated_Threat': row[2], 'Photo': detection_image, 'Capture': capture}
            data.append(dict_row)

        except:
            print("Error - ID Not found!")

    cursor.close()
    dataDB.close()

    print(data)
    return data
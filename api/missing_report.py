# This API creates a report for the missing person.

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/missing_report')
def createReport():
    id = request.json.get('id')
    print(id)

    
    detectionData = detectionDetails(id)


    missID = detectionData[0]['missing_id'] # Get the missing ID from the detection data
    print(missID)

    missingData = missingDetails(missID)

    data = detectionData + missingData

    # Return data as JSON
    print(data)

    return jsonify(data)

def detectionDetails(id):
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    sql = "SELECT detectionID, missingID, detectionDATE, detectionLOCATION, detectionCAPTURE FROM detection_data WHERE detectionID = %s"
    cursor.execute(sql, (id,))

    # Fetch all
    rows = cursor.fetchall()

    detectionData = []
    for row in rows:
        dict_row = {'id': row[0], 'missing_id': row[1], 'Found Date': row[2], 'Found Location': row[3], 'Found Image': row[4]}
        detectionData.append(dict_row)
    
    print(detectionData)

    return detectionData

def missingDetails(id):
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    sql = "SELECT missingNAME, missingFROM, missingLOCATION, missingAGE, missingGENDER, missingINFO, kinID, photoID, threatACTUAL, threatESTIMATE  FROM missing_people_data WHERE missingID = %s"
    cursor.execute(sql, (id,))

    # Fetch all
    rows = cursor.fetchall()

    missingData = []
    for row in rows:
        dict_row = {'Name': row[0], 'Missing From': row[1], 'Missing Location': row[2], 'Age': row[3], 'Gender': row[4], 'Info': row[5], 'Kin ID': row[6], ' Missing Photo ID': row[7], 'Actual Threat' : row[8], 'Estimated Threat': row[8]}
        missingData.append(dict_row)
    
    print(missingData)
    return missingData
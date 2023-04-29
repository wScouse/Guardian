# This API creates a report for the missing person.

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/detection_report', methods=['POST'])
def createDetectionReport():
    id = request.json.get('id')
    # print(id)


    
    detectionData = detectionDetails(id)


    missID = detectionData[0]['missing_id'] # Get the missing ID from the detection data
    # print(missID)

    missingData = missingDetails(missID)

    kinID = missingData[0]['Kin_ID'] # Get the kin ID from the missing data
    print(kinID)

    kindata = kinDetails(kinID)

    # data = detectionData + missingData # Potenital formatting issue

    # data = {**detectionData[0], **missingData[0]}   # Doesn't work

    data = list(detectionData[0].values()) + list(missingData[0].values()) + list(kindata[0].values()) # Works


    

    # Return data as JSON
    print(data)

    return jsonify(data)

def detectionDetails(id):
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    sql = "SELECT detectionID, missingID, detectionDATE, detectionLOCATION, detectionCAPTURE, detectionTHREAT FROM detection_data WHERE detectionID = %s"
    cursor.execute(sql, (id,))

    # Fetch all
    # rows = cursor.fetchall()

    # Fetchone
    row = cursor.fetchone()

    # print(row)

    # detectionData = []
    # for row in rows:
    #     dict_row = {'detection_ id': row[0], 'missing_id': row[1], 'Found_Date': row[2], 'Found_Location': row[3], 'Found_Image': row[4]}
    #     detectionData.append(dict_row)

    detectionData = [{'detection_ id': row[0], 'missing_id': row[1], 'Found_Date': row[2], 'Found_Location': row[3], 'Found_Image': row[4], 'Threat': row[5]}]
    
    # print(detectionData)

    return detectionData

def missingDetails(id):
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    sql = "SELECT missingNAME, missingFROM, missingLOCATION, missingAGE, missingGENDER, missingINFO, kinID, photoID, threatESTIMATE  FROM missing_people_data WHERE missingID = %s"
    cursor.execute(sql, (id,))

    # Fetch all
    # rows = cursor.fetchall()

    # Fetchone
    row = cursor.fetchone()

    # print(row)

    # missingData = []
    # for row in rows:
    #     dict_row = {'Name': row[0], 'Missing_From': row[1], 'Missing_Location': row[2], 'Age': row[3], 'Gender': row[4], 'Info': row[5], 'Kin_ID': row[6], ' Missing_Photo_ID': row[7], 'Actual_Threat' : row[8], 'Estimated_Threat': row[8]}
    #     missingData.append(dict_row)
    
    missingData = [{'Name': row[0], 'Missing_From': row[1], 'Missing_Location': row[2], 'Age': row[3], 'Gender': row[4], 'Info': row[5], 'Kin_ID': row[6], ' Missing_Photo_ID': row[7], 'Estimated_Threat': row[8]}]

    # print(missingData)
    return missingData

def kinDetails(id):
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    sql = "SELECT kinNAME, kinMOBILE, kinEMAIL FROM kin_data WHERE kinID = %s"
    cursor.execute(sql, (id,))


    # Fetchone
    row = cursor.fetchone()

    print(row)

    kindata = [{'Kin_Name': row[0], 'Kin_Mobile': row[1], 'Kin_Email': row[2]}]

    print(kindata)
    return kindata
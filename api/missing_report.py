# This API creates a report for the missing person.

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/missing_report', methods=['POST'])
def createMissingReport():
    id = request.json.get('id')
    # print(id)



    missingData = missingDetails(id)

    kinID = missingData[0]['Kin_ID'] # Get the kin ID from the missing data
    # print(kinID)

    kindata = kinDetails(kinID)


    data = list(missingData[0].values()) + list(kindata[0].values()) # Works


    

    # Return data as JSON
    # print(data)

    return jsonify(data)


def missingDetails(id):
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_missing_people_data")

    cursor = dataDB.cursor()
    # Check current count
    sql = "SELECT missingNAME, missingFROM, missingLOCATION, missingAGE, missingGENDER, missingINFO, kinID, photoID, threatACTUAL, threatESTIMATE  FROM missing_people_data WHERE missingID = %s"
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
    
    missingData = [{'ID' : id, 'Name': row[0], 'Missing_From': row[1], 'Missing_Location': row[2], 'Age': row[3], 'Gender': row[4], 'Info': row[5], 'Kin_ID': row[6], ' Missing_Photo_ID': row[7], 'Actual_Threat' : row[8], 'Estimated_Threat': row[8]}]

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

    # print(row)

    kindata = [{'Kin_Name': row[0], 'Kin_Mobile': row[1], 'Kin_Email': row[2]}]

    print(kindata)
    return kindata
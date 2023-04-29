# Handle rejections of requests

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/reject')
def rejectRequest():
    id = request.json.get('id')
    # print(id)

    selection = 'Rejected'


    # Connect to database
    emailDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    cursor = emailDB.cursor()
    sql = "UPDATE user_requests SET requestAPPROVAL = %s WHERE requestID = %s"
    cursor.execute(sql, (selection, id,))

    emailDB.commit()

    cursor.close()
    emailDB.close()

    # Return data as JSON
    return jsonify({'message': ' Request rejected'})
# This API removes a user from the database.

from flask import Flask, request, session, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/api/remove')
def removeUser():
    email = request.json.get('email')
    print(email)
    # Connect to database
    usersDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    cursor = usersDB.cursor()
    
    sql = "DELETE FROM user_data WHERE userEMAIL = %s"
    cursor.execute(sql, (email,))

    usersDB.commit()

    sql = "DELETE FROM user_requests WHERE requestEMAIL = %s"
    cursor.execute(sql, (email,))

    usersDB.commit()

    cursor.close()
    usersDB.close()

    # Return data as JSON
    return jsonify({'message': ' User Deleted'})
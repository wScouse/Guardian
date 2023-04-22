# Login functionality for Guardian

from flask import Flask, request, session, jsonify
import hashlib
import mysql.connector
from flask_jwt_extended import create_access_token

app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    print(email)
    password = request.json.get('password')
    print(password)

    # Check if valid email
    if validateEmail(email) == False:
        return jsonify({'success': False}), 401
    else:
        print("Valid email")

        hashedPassword = hashlib.sha256(password.encode()).hexdigest()
        print(hashedPassword)


        # Check if valid user
        if validateUser(email, hashedPassword) == False:
            return jsonify({'success': False}), 401
        else:
            print("Valid user")
            # access_token = create_access_token(identity=email)
            # print("Access token: " + access_token)
            # return jsonify({'success': True, 'access_token': access_token})
            session['email'] = email
            return jsonify({'success': True})


    
def validateEmail(email):
    # Connect to database
    emailDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    cursor = emailDB.cursor()
    # Check current count
    cursor.execute("SELECT requestEMAIL FROM user_requests")

    # Fetch all
    result = cursor.fetchall()

    # Create a list of emails
    emails = []
    for row in result:
        emails.append(row[0])


    cursor.close()
    emailDB.close()

    if email in emails:
        return True # Valid email
    else:
        return False # Invalid email
    
def validateUser(email, hashedPassword):
    # This function will validate the user's email and password
    # Connect to database
    # Connect to database
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    # Get a cursor object
    cursor = dataDB.cursor()

    sql = "SELECT userPASSWORD FROM user_data WHERE userEMAIL = %s"
    cursor.execute(sql, (email,))

    results = cursor.fetchone()

    hashedPassword2 = results[0]    # Hashed password from database

    cursor.close()
    dataDB.close()

    if hashedPassword == hashedPassword2:
        return True
    else:
        return False
# Handle approval of requests
# Create an account using email provided in request

from flask import Flask, request, session, jsonify
import mysql.connector
import random
import hashlib

app = Flask(__name__)

@app.route('/api/approve')
def approveRequest():
    id = request.json.get('id')
    print(id)

    updateRequests(id)

    # Get the email from the given ID
    email = fetchEmail(id)
    print(f"Email: {email}")

    # Generate a random password
    hashedPassword, password = generatePassword()

    print(f"Password: {password}")
    print(f"Hashed Password: {hashedPassword}")

    # Create an account using the email and password
    createAccount(email, hashedPassword)


    # Return data as JSON
    return jsonify({'message': ' Account Created'})

def updateRequests(id):
    selection = 'Approved'

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

def fetchEmail(id):
    

    # Connect to database
    emailDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    cursor = emailDB.cursor()
    sql = "SELECT requestEMAIL FROM user_requests WHERE requestID = %s"
    cursor.execute(sql, (id,))

    results = cursor.fetchone()

    email = results[0]

    cursor.close()
    emailDB.close()

    return email

def generatePassword():
    # Generate a random password
    password = "".join(random.choices("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", k=10))

    # Hash password using SHA256
    hashedPassword = hashlib.sha256(password.encode()).hexdigest()

    return hashedPassword, password

def createAccount(email, hashPassword):
    # Connect to database
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    # Get a cursor object
    cursor = dataDB.cursor()


    try:
        cursor.execute("INSERT INTO user_data (userEMAIL, userPASSWORD) VALUES (%s, %s)", (email, hashPassword))
        # Commit transaction
        dataDB.commit()

        print("Data inserted!")

    except Exception as e:
        # Rollback the transaction if an error occurred.
        dataDB.rollback()
        print("Error: ", e)
    
    # Close the connection
    cursor.close()
    dataDB.close()
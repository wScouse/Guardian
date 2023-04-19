# This API retrieves the password for the user.

from flask import Flask, request, session, jsonify
import mysql.connector
import random
import hashlib

app = Flask(__name__)

@app.route('/api/reset')
def userDetails():
    email = request.json.get('email')
    print(email)

    hashedPassword, newPassword = generatePassword()

    print(f"New Password for user {email}: {newPassword}")
    # print(f"New Hashed Password: {hashedPassword}")
    
    # Update password
    updatePassword(hashedPassword, email)

    # Return data as JSON
    return jsonify({'password': newPassword})

def generatePassword():
    # Generate a random password
    password = "".join(random.choices("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", k=10))

    # Hash password using SHA256
    hashedPassword = hashlib.sha256(password.encode()).hexdigest()

    return hashedPassword, password

def updatePassword(hashedPassword, email):
    # Connect to database
    userDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    cursor = userDB.cursor()
   
    try:
        cursor.execute("UPDATE user_data SET userPASSWORD = %s WHERE userEMAIL = %s", (hashedPassword, email))
        # Commit transaction
        userDB.commit()

        print("Data inserted!")

    except Exception as e:
        # Rollback the transaction if an error occurred.
        userDB.rollback()
        print("Error: ", e)

    

    cursor.close()
    userDB.close()
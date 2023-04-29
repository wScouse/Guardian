# Request Access function for Guardian

from flask import Flask, request, session, jsonify
import mysql.connector
import datetime

app = Flask(__name__)

@app.route('/api/request', methods=['POST'])
def requestAccess():
    email = request.json.get('email')
    # print(email)

     # Check if email has been used already
    validEmail = extractEmails(email)

    if validEmail == False:
        return jsonify({'success': False}), 401
    else:
        saveData(email)
        return jsonify({'success': True})

# Extract Emails
def extractEmails(email):
    # Connect to database
    emailDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    cursor = emailDB.cursor()
    # Check current count
    cursor.execute("SELECT requestEMAIL FROM user_requests")
    
    emails = [row[0] for row in cursor.fetchall()]

    cursor.close()
    emailDB.close()

    if email in emails:
        return False    # Email has been used
    else:
        return True     # Email has not been used

# Save to database
def saveData(email):
# Connect to database
    dataDB=mysql.connector.connect(
    host="localhost", user="root",
    password="", database="guardian_data")

    # Get a cursor object
    cursor = dataDB.cursor()

    requestDate = datetime.datetime.now()

    try:
        cursor.execute("INSERT INTO user_requests (requestEMAIL, requestDATE) VALUES (%s, %s)", (email, requestDate))
        # Commit transaction
        dataDB.commit()

        # print("Data inserted!")

    except Exception as e:
        # Rollback the transaction if an error occurred.
        dataDB.rollback()
        print("Error: ", e)
    
    # Close the connection
    dataDB.close()
# Create MySQL table to store missing people data

import mysql.connector
import datetime

print("Connecting to DB..")
missingDB=mysql.connector.connect(
    host="localhost", user="Guardian",
    password="", database="guardian_missing_people_data")

#WSL
# conn_object=mysql.connector.connect(host="172.21.192.1", user="wsl_root", password="", database="guardian_missing_people_data")

print("Test")
print(missingDB)

# Data Inputs

## Missing Person Data
print("\n")
print("Missing Person Data")
dataName = input("Name: ")
dataAge = input("Age: ")
dataGender = input("Gender: ")
dataLocation = input("Last known location: ")
dataInfo = input("Additional Info: ")
dataDate = datetime.datetime.now()
print("\n")

# Reporting Person Contact
print("Contact Details")
dataReporting = input("Name: ")
dataMobile = input("Mobile: ")
dataEmail = input("Email: ")


# Get a cursor object
cursor = missingDB.cursor()

# Start the transaction
missingDB.start_transaction

try:

    kinData = (dataReporting, dataMobile, dataEmail)
    cursor.execute("INSERT INTO kin_data (kinNAME, kinMOBILE, kinEMAIL) VALUES (%s, %s, %s)", kinData)

    # Get the KinID of the inserted row
    kinID = cursor.lastrowid

    # Add data to database.
    sql = "INSERT INTO missing_people_data (missingNAME, missingAGE, missingGENDER, missingLOCATION, missingINFO, missingFROM, kinID, foundSTATUS) values (%s, %s, %s, %s, %s, %s, %s, %s)"
    val = (dataName, dataAge, dataGender, dataLocation, dataInfo, dataDate, kinID, "False")
    cursor.execute(sql, val)

    caseID = cursor.lastrowid
    print(caseID)

    # Commit transaction
    missingDB.commit()

    print("Data inserted!")

except Exception as e:
    # Rollback the transaction if an error occurred.
    missingDB.rollback()
    print("Error: ", e)

# Image Preprocessing

# Select Image


# Create ID


# Save Image with ID


# Add ID to table

# Close cursor
cursor.close()

# Close connection object
missingDB.close()
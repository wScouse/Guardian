# Monitor the database for changes.

import mysql.connector
import time

print("Connecting to DB..")
missingDB=mysql.connector.connect(
    host="localhost", user="Guardian",
    password="", database="guardian_missing_people_data")

# Create cursor
cursor = missingDB.cursor()
print("Connected")

# Get the initial count of row in the missing data table.
cursor.execute("SELECT COUNT(*) FROM missing_people_data")
initialCount = cursor.fetchone()[0]

cursor.close()

def review(rowCount):
    # This function checks to see if a new entry has been added.
    reviewDB=mysql.connector.connect(
    host="localhost", user="Guardian",
    password="", database="guardian_missing_people_data")

    cursor = reviewDB.cursor()
    # Check current count
    cursor.execute("SELECT COUNT(*) FROM missing_people_data")
    currentCount = cursor.fetchone()[0]
    print(f"Current Count: {currentCount}")

    # If there is a new row, create an alert.
    if currentCount > rowCount:
        print("New entry added!\n")

        # Update the row count variable
        rowCount = currentCount
    
    else:
        print("No updates\n")

    cursor.close()
    reviewDB.close()
    return rowCount

def threatAnalysis():
    # This function is where the user can assess threats of new cases.
    threatDB=mysql.connector.connect(
    host="localhost", user="Guardian",
    password="", database="guardian_missing_people_data")
    cursor = threatDB.cursor()  

    sql = "SELECT missingID FROM missing_people_data WHERE threatESTIMATE IS NULL"
    cursor.execute(sql)

    backlog = cursor.fetchall()

    print("Cases (IDs) waiting for assessment")

    for x in backlog:
        print(x)

    caseSelect = input("Select case: ")

    # Get details by missingID
    sql = "SELECT missingNAME, missingAGE, missingFROM, missingLOCATION, missingINFO FROM missing_people_data WHERE missingID = %s"
    cursor.execute(sql, (caseSelect,))

    caseInfo = cursor.fetchone()
    caseName, caseAge, caseFrom, caseLocation, caseAinfo = caseInfo

    print("\nCase Details:\n")

    print("Name: ", caseName)
    print("Age: ", caseAge)
    print("Reported Missing: ", caseFrom)
    print("Last known location: ", caseLocation)
    print("Additional Info:")
    print(caseAinfo)
    print("\n")

    print("Threat Levels")
    noThreat = "No Risk to subject or public."
    lowThreat = "Possible (minimal) risk to subject or public."
    mediumThreat = "Likely but not serious risk to subject or public."
    highThreat = "Serious threat to subject or public."
    print("None: ", noThreat)
    print("Low: ", lowThreat)
    print("Medium: ", mediumThreat)
    print("High: ", highThreat)
    selection = input("Threat Level: ")

    sql = "UPDATE missing_people_data SET threatESTIMATE = %s WHERE missingID = %s"
    cursor.execute(sql, (selection, caseSelect,))
    
    threatDB.commit()

    threatDB.close()

def main(initialCount):
    print("\nAdmin Panel\n")

    rowCount = review(initialCount)

    print(f"Missing People: {rowCount}")

    # Options
    print("1: View Recent")
    print("2: Review Case")
    print("3: Assess Threat Level")
    selection = int(input("Select Option: "))

    # Operations
    if selection == 1:
        review(rowCount)
        main(rowCount)
    elif selection == 3:
        threatAnalysis()
        main(rowCount)


main(initialCount)
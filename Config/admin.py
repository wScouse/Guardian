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


def main(initialCount):
    print("\nAdmin Panel\n")

    rowCount = review(initialCount)

    print(f"Missing People: {rowCount}")


    print("1: Check for updates")
    print("1: View Recent")
    selection = int(input("Select Option: "))

    if selection == 2:
        review(rowCount)
        main(rowCount)


main(initialCount)
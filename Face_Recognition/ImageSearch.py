# Guardian - DeepFace Face Recognition

# Setup
import tkinter as tk
from tkinter import filedialog
from deepface import DeepFace
import cv2
import matplotlib.pyplot as plt
# from PIL import Image
# import pandas as pd
import mysql.connector

# Tkinter settings
root = tk.Tk()
root.withdraw()

def fileSelector():
    # File Selection
    file_path = filedialog.askopenfilename(
        initialdir="C:/Users/willi/Documents/#DEV/Uni/Dissertation/", title="Select Image File",
        filetypes=[("Image Files", ("*.jpg", "*.jpeg", "*.png", "*.bmp"))])

    # Get file name.
    file_name = file_path.split("/")[-1]
    print("Selected file name:", file_name)

    img1 = cv2.imread(file_path)

    return img1


def findImage(img1):
    # This function uses DeepFace in an attempt to find the selected image in the db.
    result = DeepFace.find(img1, db_path = "C:/Users/willi/Documents/#DEV/Uni/Dissertation/GuardianDB")
    print("\n")

    # List to store matching IDs
    matchingIDs = []

    # Print all matches

    index = 0

    while True:
        try:
            # print(result[0].iloc[index].identity)
            resultFile = result[0].iloc[index].identity

            # Get the image file
            missingFile = resultFile.split("/")[-1]

            # Get the ID
            missingID = missingFile.split(".")[0]

            # print("Alert! Missing person identified! ID:", missingID)
            # print("\n")

            matchingIDs.append(missingID)

            index += 1

        except IndexError:
            break

    
    return matchingIDs
    
    


def extractData(caseIDs):
    # This function will extract the data for matching IDs.

    guardianDB=mysql.connector.connect(
        host="localhost", user="Guardian",
        password="", database="guardian_missing_people_data")
    cursor = guardianDB.cursor()  

    for x in caseIDs:

        # Get details by missingID
        sql = "SELECT * FROM missing_people_data WHERE photoID = %s"
        cursor.execute(sql, (x,))

        caseInfo = cursor.fetchone()


        if caseInfo == None:
            print("No match for given ID: %s" % x)
        else:
            # Extracts data and assigns them to variables
            caseID, caseName, caseFrom, caseLocation, caseAge, caseGender, caseAinfo, caseReporter, casePhoto, caseCapture, caseEthreat, caseAthreat, caseStatus, caseEnd = caseInfo

            print("\nID: %s matches Case ID: %s" % (x, caseID))
            print("\n")
            print("Name: %s" % caseName)
            print("Age: %s" % caseAge)
            print("Gender: %s" % caseGender)
            print("Reported Missing: %s" % caseFrom)
            print("Last known location: %s" % caseLocation)
            print("Additional Info: %s" % caseAinfo)

            print("Estimated Threat: %s" % caseEthreat)
            print("Actual Threat")

            print("Reported by %s" % caseReporter)
            print("Reported on: ")
            print("\n")



    
    cursor.close()
    guardianDB.close()


img1 = fileSelector()
matchingIDs = findImage(img1)

if not matchingIDs:
    # If there are no matches this message is displayed.
    print("No matches found.")
else:
    # Otherwise the details are extracted.
    print("The following Case IDs have been found: %s \n" % matchingIDs)
    extractData(matchingIDs)

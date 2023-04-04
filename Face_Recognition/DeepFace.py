# Guardian - DeepFace Face Recognition

# Setup
import tkinter as tk
from tkinter import filedialog

# Tkinter settings
root = tk.Tk()
root.withdraw()

# File Selection
file_path = filedialog.askopenfilename(
    initialdir="C:/Users/willi/Documents/#DEV/Uni/Dissertation/", title="Select Image File",
    filetypes=[("Image Files", ("*.jpg", "*.jpeg", "*.png", "*.bmp"))])

# Get file name.
file_name = file_path.split("/")[-1]
print("Selected file name:", file_name)

# Face Recognition using DeepFace
print("\nFace Recognition\n")
from deepface import DeepFace
import cv2
import matplotlib.pyplot as plt
from PIL import Image
import pandas as pd

# print("Selected Image")
img1 = cv2.imread(file_path)
# plt.imshow(cv2.cvtColor(img1, cv2.COLOR_BGR2RGB))
# plt.show()


# Is person in database?
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

        print("Alert! Missing person identified! ID:", missingID)
        print("\n")

        matchingIDs.append(missingID)

        index += 1

    except IndexError:
        break

print(matchingIDs)
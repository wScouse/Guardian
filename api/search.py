# This API uses DeepFace to compare the image in the request to the image in the database.

from flask import Flask, request, session, jsonify
import mysql.connector
import cv2
import matplotlib.pyplot as plt
from PIL import Image

app = Flask(__name__)

@app.route('/api/search')
def search():
    image_file = request.files['image']
    print(image_file)

    # Debug - Remove before production
    # Show Image
    img = plt.imread(image_file)
    plt.imshow(img)
    plt.show()

    return jsonify({'success': True})
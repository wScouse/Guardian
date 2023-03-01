# Libraries
import tkinter as tk
from tkinter import Message, Text
import cv2
import os
import shutil
import csv
import numpy as np
from PIL import Image, ImageTk
import pandas as pd
import datetime
import time
import tkinter.ttk as ttk
import tkinter.font as font
from pathlib import Path

window = tk.Tk()
window.title("Face_Recogniser")
window.configure(background="white")
window.grid_rowconfigure(0, weight=1)
window.grid_columnconfigure(0, weight=1)
message = tk.Label(window, text="Welcome to Face Recogniser", font=("Helvetica", 2))

# Create MySQL table to store missing people data

import mysql.connector

# conn_object=mysql.connector.connect(
#     host="localhost", user="guardian",
#     password="", database="guardian_missing_people_data")
print("Connecting to..")
#WSL
conn_object=mysql.connector.connect(host="172.21.192.1", user="wsl_root", password="", database="guardian_missing_people_data")

print("Test")
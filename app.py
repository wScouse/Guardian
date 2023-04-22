# Main Flask App for Guardian

from flask import Flask
from api import api_bp
from flask_cors import CORS # Comment this on deployment.
import os
from flask_jwt_extended import JWTManager

secret = os.urandom(24)

app = Flask(__name__)
CORS(app) # Comment this on deployment.
app.secret_key = secret
jwt = JWTManager(app)
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
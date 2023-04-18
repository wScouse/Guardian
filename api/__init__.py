from flask import Blueprint

api_bp = Blueprint('api_bp', __name__)

from . import login
api_bp.add_url_rule('/login', view_func=login.login, methods=['POST'])
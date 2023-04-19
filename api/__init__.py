from flask import Blueprint

api_bp = Blueprint('api_bp', __name__)

from . import login
api_bp.add_url_rule('/login', view_func=login.login, methods=['POST'])

from . import request
api_bp.add_url_rule('/request', view_func=request.requestAccess, methods=['POST'])

from . import requests
api_bp.add_url_rule('/requests', view_func=requests.getData, methods=['GET'])

from . import requests_rejects
api_bp.add_url_rule('/reject', view_func=requests_rejects.rejectRequest, methods=['POST'])

from . import requests_approve
api_bp.add_url_rule('/approve', view_func=requests_approve.approveRequest, methods=['POST'])

from . import users
api_bp.add_url_rule('/users', view_func=users.getUsers, methods=['GET'])

from . import users_reset
api_bp.add_url_rule('/reset', view_func=users_reset.userDetails, methods=['POST'])

from . import users_remove
api_bp.add_url_rule('/remove', view_func=users_remove.removeUser, methods=['POST'])
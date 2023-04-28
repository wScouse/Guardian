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

from . import reports
api_bp.add_url_rule('/reports', view_func=reports.getReports, methods=['GET'])

from . import missing_report
api_bp.add_url_rule('/missing_report', view_func=missing_report.createMissingReport, methods=['POST'])

from . import logout
api_bp.add_url_rule('/logout', view_func=logout.logout, methods=['POST'])

from . import detections
api_bp.add_url_rule('/detections', view_func=detections.getDetections, methods=['GET'])

from . import detection_report
api_bp.add_url_rule('/detection_report', view_func=detection_report.createDetectionReport, methods=['POST'])

from . import search
api_bp.add_url_rule('/search', view_func=search.search, methods=['POST'])

from . import report_missing
api_bp.add_url_rule('/report', view_func=report_missing.reportMissing, methods=['POST'])

from . import test
api_bp.add_url_rule('/test', view_func=test.Hello, methods=['POST'])

from . import missing_add
api_bp.add_url_rule('/missing_add', view_func=missing_add.new_missing, methods=['POST'])

from . import search_add
api_bp.add_url_rule('/search_add', view_func=search_add.logDetection, methods=['POST'])
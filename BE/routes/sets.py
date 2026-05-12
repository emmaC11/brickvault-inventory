from flask import Blueprint, jsonify
from models import LegoSet

# splits logic into smaller pieces - can have multiple blueprints for different resources, prevents all logic from being in app.py
sets_bp = Blueprint('sets', __name__) 

@sets_bp.route('/sets', methods=['GET'])
def get_sets():
    sets = LegoSet.query.all()
    sets_list = [set.to_dict() for set in sets]
    return jsonify(sets_list)
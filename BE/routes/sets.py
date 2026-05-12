from flask import Blueprint, jsonify, request
from database import db
from models import LegoSet

# splits logic into smaller pieces - can have multiple blueprints for different resources, prevents all logic from being in app.py
sets_bp = Blueprint('sets', __name__) 

@sets_bp.route('/sets', methods=['GET'])
def get_sets():
    sets = LegoSet.query.all()
    sets_list = [set.to_dict() for set in sets]
    return jsonify(sets_list)

@sets_bp.route('/sets', methods=['POST'])
def create_set():
    data = request.get_json()
    new_set = LegoSet(name=data['name'], price=data['price'], set_number=data['set_number'])
    db.session.add(new_set)
    db.session.commit()
    return jsonify(new_set.to_dict()), 201
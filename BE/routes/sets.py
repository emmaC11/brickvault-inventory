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

@sets_bp.route('/sets/<int:set_id>', methods=['PUT'])
def update_set(set_id):
    data = request.get_json()
    update_set = LegoSet.query.get(set_id)
    if update_set:
        update_set.name = data['name']
        update_set.price = data['price']
        update_set.set_number = data['set_number']
        update_set.year = data.get('year', update_set.year)
        update_set.num_parts = data.get('num_parts', update_set.num_parts)
        update_set.notes = data.get('notes', update_set.notes)
        db.session.commit()
        return jsonify(update_set.to_dict()), 200
    else:
        return jsonify({'error': 'Set not found'}), 404


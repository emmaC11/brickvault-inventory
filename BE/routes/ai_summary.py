from env import ANTHROPIC_API_KEY
from flask import Blueprint, jsonify
from models import LegoSet
import anthropic

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/sets/<int:set_id>/summary', methods=['GET'])
def generate_summary(set_id):
    # query set from db
    lego_set = LegoSet.query.get(set_id)
    if not lego_set:
        return jsonify({'error': 'Set not found'}), 404
    
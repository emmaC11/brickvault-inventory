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
    
    ## call claude API to generate set summary
    claudeClient = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    
    # used ai to generate prompt
    prompt = f"""Generate a brief, engaging product description (2-3 sentences) for this LEGO set:
    
    Name: {lego_set.name}
    Set Number: {lego_set.set_number}
    Year: {lego_set.year or 'Unknown'}
    
    Focus on what makes this set appealing for collectors and enthusiasts."""

    message = claudeClient.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=200,
    messages=[{"role": "user", "content": prompt}]
)
 
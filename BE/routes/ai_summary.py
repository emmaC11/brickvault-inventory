from env import ANTHROPIC_API_KEY
from flask import Blueprint, jsonify, request
from models import LegoSet
import anthropic

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/sets/summary', methods=['POST'])
def generate_summary():
    # data from request body
    data = request.get_json()
    set_number = data.get('set_number')
    year = data.get('year', 'NA')
    name = data.get('name')

    
    try:
        ## call claude API to generate set summary
        claudeClient = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        
        # used ai to generate prompt
        prompt = f"""Generate a brief, engaging product description (2-3 sentences) for this LEGO set:
        
        Name: {name}
        Set Number: {set_number}
        Year: {year}
        
        Focus on what makes this set appealing for collectors and enthusiasts."""

        message = claudeClient.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=200,
        messages=[{"role": "user", "content": prompt}]
    )

        summary = message.content[0].text
        return jsonify({'summary': summary}), 200  
     
    except Exception as error:
        return jsonify({'error in ai_summary.py': str(error)}), 500
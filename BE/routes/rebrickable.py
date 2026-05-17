from env import REBRICKABLE_API_KEY
from flask import Blueprint, jsonify, request
import requests

rebrickable_bp = Blueprint('rebrickable', __name__)

@rebrickable_bp.route('api/rebrickable/sets/<set_number>', methods=['GET'])
def get_set_details_from_rebrickable(set_number):
        url = 'https://rebrickable.com/api/v3/lego/sets/{set_number}'
        headers = {'Authorization': {REBRICKABLE_API_KEY}}

        response = requests.get(url, headers=headers)

        if response.status_code !=200:
            return jsonify({'failed to fetch data from rebrickable API'}), response.status_code

        if response.status_code == 404:
            return jsonify({'set not found in rebrickable API'}), 404
        
        data = response.json()

        set_data = {
            'name': data.get('name'),
            'set_number': data.get('set_num'),
            'year': data.get('year'),
            'num_parts': data.get('num_parts'),
        }

        return jsonify(set_data), 200   
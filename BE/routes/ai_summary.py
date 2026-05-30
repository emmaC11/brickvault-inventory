from env import ANTHROPIC_API_KEY
from flask import Blueprint, jsonify
from models import LegoSet
import anthropic

ai_bp = Blueprint('ai', __name__)

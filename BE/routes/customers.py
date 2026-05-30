from flask import Blueprint, jsonify, request
from database import db
from models import LegoSet, Customer, WishlistEntry

customers_bp = Blueprint('customers', __name__)
from flask import Blueprint, jsonify, request
from database import db
from models import LegoSet, Customer, WishlistEntry

customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    # loop through customers and get wishlist entries
    for customer in customers:
        wishlist_entries = WishlistEntry.query.filter_by(customer_id=customer.id).all()
        available_sets = []
        # loop through customer wishlist entries and append to availablle sets list
        for entry in wishlist_entries:
            lego_set = LegoSet.query.get(entry.lego_set_id)
            # set exists - add to available sets list
            if lego_set:
                available_sets.append(lego_set.to_dict())

from database import db

class LegoSet(db.Model): # todo: add rest of the fields
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(100), nullable=False) 
    price = db.Column(db.Float, nullable=False) 
    set_number  = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=True)
    num_parts =  db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String(1000), nullable=True)
    stock = db.Column(db.Integer, nullable=False, default=1)
    description = db.Column(db.String(1000), nullable=True)
    condition = db.Column(db.String(50), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'set_number': self.set_number,
            'year': self.year,
            'num_parts': self.num_parts,
            'notes': self.notes,
            'stock': self.stock,
            'description': self.description,
            'condition': self.condition
        }
    
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    f_name = db.Column(db.String(50), nullable=False) 
    l_name = db.Column(db.String(50), nullable=False) 
    email = db.Column(db.String(100), unique=True, nullable=False) 

    def to_dict(self):
        return {
            'id': self.id,
            'f_name': self.f_name,
            'l_name': self.l_name,
            'email': self.email,
        }
    
class WishlistEntry(db.Model):
    wishlist_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    lego_set_id = db.Column(db.Integer, db.ForeignKey('lego_set.id'), nullable=False)

    def to_dict(self):
        return {
            'wishlist_id': self.wishlist_id,
            'customer_id': self.customer_id,
            'lego_set_id': self.lego_set_id
        }
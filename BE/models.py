from database import db

class LegoSet(db.Model): # todo: add rest of the fields
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(100), nullable=False) 
    price = db.Column(db.Float, nullable=False) 
    set_number  = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'set_number': self.set_number
        }
from flask import Flask, jsonify # jsonify - convert python dict to json format for FE to read
from flask_cors import CORS
from database import db
from models import LegoSet
from routes.sets import sets_bp
from routes.rebrickable import rebrickable_bp

app = Flask(__name__)
CORS(app) # allow cross-origin requests from the FE

# db config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brickvault.db' # relative path to db file
db.init_app(app) # connect db to flask app

# register blueprints
app.register_blueprint(sets_bp)
app.register_blueprint(rebrickable_bp)

# create DB tables defined in models.py
with app.app_context():
    db.create_all()

# sample route
@app.route('/')

def test():
    return 'hello world'

@app.route('/about') # decorator - must be directly above the function I want to call
def aboutTest(): # connected to function
    return jsonify({ 'message': 'calling from flask', 'status': 'success'
    })

# run
if __name__ == '__main__':
    app.run(debug=True)
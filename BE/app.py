from flask import Flask, jsonify # jsonify - convert python dict to json format for FE to read
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # allow cross-origin requests from the FE

# db config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///brickvault.db' # relative path to db file


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
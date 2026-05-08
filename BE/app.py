from flask import Flask, jsonify # jsonify - convert python dict to json format for FE to read
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # allow cross-origin requests from the FE

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
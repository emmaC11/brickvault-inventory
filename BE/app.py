from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # allow cross-origin requests from the FE

# sample route
@app.route('/')

def test():
    return 'hello world'

@app.route('/about') # decorator - must be directly above the function I want to call
def aboutTest(): # connected to function
    return 'this is a flask app'

# run
if __name__ == '__main__':
    app.run(debug=True)
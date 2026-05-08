from flask import Flask

app = Flask(__name__)

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
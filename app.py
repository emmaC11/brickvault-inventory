from flask import Flask

app = Flask(__name__)

# sample route
@app.route('/')

def test():
    return 'hello world'

# run
if __name__ == '__main__':
    app.run(debug=True)
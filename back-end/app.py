from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/hello')
def hello():
    return 'Hello, World!'


if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    app.run()
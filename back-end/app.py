""" Back-end app running with Flask """
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/hello")
def hello():
    return "Hello, World!"


if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    app.run()

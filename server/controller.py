from flask import Flask, jsonify, request, current_app, send_from_directory
from flask_cors import CORS
from manager import Manager
import os


app = Flask(__name__)
CORS(app)


@app.route('/api/addingColumns', methods=['POST'])
def function():
    login_json = request.get_json()
    input = login_json.get('values')
    N = input['N']
    addingcolumns = input['addingcolumns']
    directory=os.path.join(current_app.root_path, "temp")
    if not os.path.exists(directory):
        os.makedirs(directory)
    m = Manager(directory)
    result = m.myfunc(N, addingcolumns)
    return {"downloadLink": "http://localhost:5000/api/addingColumns/" + result}


@app.route('/api/addingColumns/<path:filename>', methods=['GET'])
def download(filename):
    # Appending app path to upload folder path within app root folder
    uploads = os.path.join(current_app.root_path, "temp")
    # Returning file from appended path
    return send_from_directory(directory=uploads, filename=filename)

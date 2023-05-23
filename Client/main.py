import numpy as np
import pandas as pd
from flask import Flask, render_template, request
import requests
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app)




@app.route('/',methods=['POST'])
def index():
    data=request.data
    strData=data.decode()
    jsonObjectData = json.loads(strData)
    criteria = {
        'latency':float(jsonObjectData['latency']),
        'availability':float(jsonObjectData['availability']),
        'price': float(jsonObjectData['price'])
    }
    
    res = requests.post('http://127.0.0.1:5002/predict', json=criteria)
    
    stringRes=res.content.decode()
    ans1=json.loads(stringRes)

    # print("The answer is : ",ans1)
    # dictFromServer = res.json()
    return ans1





if __name__ == "__main__":
    app.run(debug=True, port=5001)

                  

import numpy as np
import pandas as pd
from flask import Flask, render_template, request
import requests

app = Flask(__name__)

criteria = {
    'latency': 5.261,
    'availability':2001,
    'price': 268
}


@app.route('/')
def index():
    res = requests.post('http://127.0.0.1:5002/predict', json=criteria)
    
    ans1=list(res)[0].decode()
    print("The answer is : ",ans1)
    # dictFromServer = res.json()
    return "hi"





if __name__ == "__main__":
    app.run(debug=True, port=5001)

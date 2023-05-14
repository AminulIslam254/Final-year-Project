import pickle
import numpy as np
import pandas as pd
from flask import Flask, render_template, request
import json
import requests
import openpyxl

app = Flask(__name__)
data = openpyxl.load_workbook('projectXlsx.xlsx')
pipe=pickle.load(open('Model.pkl','rb'))


@app.route('/')
def index():
    return "Hello"


@app.route('/predict', methods=['POST'])
def predict():
    data=request.data
    strData=data.decode()
    jsonObjectData = json.loads(strData)
    # print(jsonObjectData['latency'])
    
    latency =jsonObjectData['latency']
    availability =jsonObjectData['availability']
    price =jsonObjectData['price']

    

    # print(type(latency))

    # print(latency,availability,price)
    input=pd.DataFrame([[latency,availability,price]],columns=['Latency','Availability','Price'])
    prediction=pipe.predict(input)
    print(prediction[0])

    data_send={
            "criteria_column":latency,
            "criteria_value":int(prediction[0][0]),
            "new_value":prediction[0][1]
        }
    res = requests.post('http://127.0.0.1:6063/change_excel', json=data_send)
    if prediction[0][2]>=1:
        return str(prediction[0])
    else:
        return "Flag is 0"


if __name__ == "__main__":
    app.run(debug=True, port=5002)

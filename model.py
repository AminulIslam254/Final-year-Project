

import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVC

class Model:
    def __init__(self):
        self.price_regressor = LinearRegression()
        self.server_predictor = SVC()

    def fit(self,x,y1, y2):
        self.price_regressor.fit(x, y1)
        self.server_predictor.fit(x, y2)

    def predict(self,x):
        price = self.price_regressor.predict(x)
        server = self.server_predictor.predict(x)

        return price, server

model = Model()

# new codes starts from here

import pandas as pd
import numpy as np

data=pd.read_csv('FinalData.csv')

x=data.drop(columns=['bandwidth_bytes','server_id','payload_size'])
y=data.drop(columns=['latency_seconds','availabity_seconds','price','payload_size'])

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import make_column_transformer
from sklearn.pipeline import make_pipeline
from sklearn.metrics import r2_score

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.2,random_state=0)

columns_transformer= make_column_transformer((OneHotEncoder(sparse=False),['server_id']),remainder='passthrough')

scaler=StandardScaler()
lr=LinearRegression()

pipe=make_pipeline(scaler,lr)

pipe.fit(x_train,y_train)

y_pred_lr=pipe.predict(x_test)

print(r2_score(y_test,y_pred_lr))


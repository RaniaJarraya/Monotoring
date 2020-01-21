# %%
#Import Libraries
import pickle
import sys, json, numpy as np
from joblib import load
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import warnings
warnings.filterwarnings('ignore')

# %%
#define labels
labels_definition = { 1:' Average', 0:'Bad', 2:'Good'}

# %%
#define functions
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

# %%
#define functions
def define_labels(labels):
	textLabels = []
	for label in labels:
		textLabels.append(labels_definition[label])
	return textLabels

def read_json(fileName):
	import mpu.io as m
	return m.read(fileName+'.json')

# %%

#Load data
#df = pd.DataFrame(read_json('C:/Users/Rania/Desktop/data/data-preprocessed/data_with_all'))

#data for regression - pathLoss
#X_reg =[[-129.068291 , -18.0, 5414.054467]]
line = read_in()
lines=[line]
# %%
#load regression model to predict pathgLoss value
polynomial = load('C:/Users/Rania/Desktop/data/data-preprocessed/polynomial.joblib')
pathLossEstimator = load('C:/Users/Rania/Desktop/data/data-preprocessed/polynomial_regression_model.joblib')

#predict PathLoss value
pathLoss = pathLossEstimator.predict(polynomial.fit_transform(lines))

# %%
##Scale data##
#load scaler
scaler_f = open('C:/Users/Rania/Desktop/data/data-preprocessed/my_scaler_QDA', "rb")
my_scaler = pickle.load(scaler_f)
scaler_f.close()

# %%
#Load classifier
classifier_f = open('C:/Users/Rania/Desktop/data/data-preprocessed/QuadraticDiscriminantAnalysis', "rb")
classifier = pickle.load(classifier_f)
classifier_f.close()


# %%

b = define_labels(classifier.predict(my_scaler.transform([[line[0], line[1],pathLoss]])))

print(b[0])

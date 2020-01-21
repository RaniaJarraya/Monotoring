import pandas as pd 
import seaborn as sns
import matplotlib.pyplot as plt

def viz_hist(df):
	viz = df[['GTW_rssi','GTW_snr','PathLoss']]
	viz.hist()
	plt.show()

def viz_rssi_snr(df):
	plt.scatter(df.GTW_rssi, df.GTW_snr,  color='blue')
	plt.xlabel("GTW_rssi")
	plt.ylabel("GTW_snr")
	plt.show()

def viz_rssi_pathLoss(df):
	plt.scatter(df.GTW_rssi, df.PathLoss,  color='blue')
	plt.xlabel("GTW_rssi")
	plt.ylabel("PathLoss")
	plt.show()

def viz_snr_pathLoss(df):
	plt.scatter(df.GTW_snr, df.PathLoss,  color='blue')
	plt.xlabel("GTW_snr")
	plt.ylabel("PathLoss")
	plt.show()

def viz_boxplot(df, viz_x, viz_y, viz_hue):
	sns.boxplot(x=viz_x, y=viz_y , data=df, hue=viz_hue)
	plt.show()

def Z_score(df):
	from scipy import stats 
	import numpy as np
	return np.abs(stats.zscore(df))

def IQR_score(df):
	##### IQR score
	#q1=df_o1.quantile(0.25)
	return 0

def delete_outlier(df, z_score, threshold=4):
	import numpy as np
	indices_to_delete = np.where(z_score > threshold)
	return df.drop(indices_to_delete[0], axis=0)

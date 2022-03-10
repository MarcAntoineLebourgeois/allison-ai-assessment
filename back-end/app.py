""" Back-end app running with Flask """
from crypt import methods
from flask import Flask, jsonify
from flask_cors import CORS
import time
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from skimage.measure import find_contours
from scipy.ndimage.filters import gaussian_filter
import eikonalfm as fm
import io

from sources.utils import read_mri, extract_curve

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/get_tumor_indices_by_patient_index/<patient_index>", methods=["GET"])
def get_tumor_indices_by_patient_id(patient_index):
    # load dataframe
    image_df = pd.read_csv("../data/image_data.csv")
    # choose a patient
    patient_id = image_df.patient_id.unique()[int(patient_index)]
    # load MRI images/masks
    image_stack, mask_stack, has_tumor_indices = read_mri(image_df, patient_id)
    print("Patient ID : ", patient_id)
    print("MRI stack : shape =", image_stack.shape, ", dtype =", image_stack.dtype)
    print("Mask stack : shape =", mask_stack.shape, ", dtype =", mask_stack.dtype)
    print("Indices of slices with segmented tumor :", has_tumor_indices)
    return jsonify(has_tumor_indices)


if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    app.run()

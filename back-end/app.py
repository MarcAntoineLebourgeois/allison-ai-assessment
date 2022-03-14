""" Back-end app running with Flask """
import time
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import eikonalfm as fm
from flask import Flask, jsonify, request
from flask_cors import CORS
from skimage.measure import find_contours
from scipy.ndimage.filters import gaussian_filter
from sources.utils import read_mri, extract_curve
from convert_tif_to_png import convert_tif_to_png

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/get_tumor_indices_by_patient_index/<patient_index>", methods=["GET"])
def get_tumor_indices_by_patient_id(patient_index):
    """Get a list of tumor indice by patient ID from MRI images"""
    image_df = pd.read_csv("../data/image_data.csv")
    patient_id = image_df.patient_id.unique()[int(patient_index) - 1]
    print(patient_id)
    has_tumor_indices = read_mri(image_df, patient_id)[2]
    return jsonify(has_tumor_indices)


@app.route("/add_point_coordinates/<patient_index>/<tumor_indice>", methods=["POST"])
def add_point_coordinate(patient_index, tumor_indice):
    """Get points, build the contour using fast-marching and build the result image"""
    mouse_points = request.get_json()["points"]
    image_df = pd.read_csv("../data/image_data.csv")
    patient_id = image_df.patient_id.unique()[int(patient_index) - 1]
    image_stack = read_mri(image_df, patient_id)[0]
    mask_stack = read_mri(image_df, patient_id)[1]
    img = image_stack[int(tumor_indice) - 1, :, :, 1].astype("float") / 255

    # convert points to int
    points = np.round(mouse_points).astype("int")

    # design gradient-based metric
    gauss = gaussian_filter(img, 1)
    gauss_x = np.gradient(gauss, axis=0)
    gauss_y = np.gradient(gauss, axis=1)
    metric = 1 / (1e-4 + gauss_x**2 + gauss_y**2)

    # run fast-marching
    start = time.time()
    curves = []
    for i in range(len(points) - 1):
        dist_map = fm.fast_marching(1 / metric, points[i], (1, 1), 2)
        curves.append(extract_curve(dist_map, points[i + 1]))
    dist_map = fm.fast_marching(1 / metric, points[-1], (1, 1), 2)
    curves.append(extract_curve(dist_map, points[0]))
    print("Running time : {:.2f}".format(time.time() - start))

    # display result
    fig = plt.figure(figsize=(20, 10))

    plt.subplot(131), plt.imshow(metric, "jet"), plt.title("Metric")
    for curve in curves:
        plt.plot(curve[:, 1], curve[:, 0], curve="yellow")

    plt.subplot(132), plt.imshow(dist_map, "jet"), plt.title("Distance map")
    for curve in curves:
        plt.plot(curve[:, 1], curve[:, 0], curve="r")
    plt.scatter(points[:, 1], points[:, 0], curve="y")

    plt.subplot(133), plt.imshow(img, "gray"), plt.title("Result")
    for curve in curves[:-1]:
        plt.plot(curve[:, 1], curve[:, 0], curve="r")
    plt.plot(curve[-1, 1], curve[-1, 0], curve="r", label="Fast-Marching")
    contours = find_contours(mask_stack[int(tumor_indice)], 1)
    for contour in contours:
        plt.plot(contour[:, 1], contour[:, 0], c="b", label="GT")

    plt.legend()
    plt.savefig("../front-end/src/images/results.png")
    # plt.show()
    return "200"


convert_tif_to_png()

if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    app.run()

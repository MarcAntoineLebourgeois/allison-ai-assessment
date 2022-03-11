""" Back-end app running with Flask """
from crypt import methods
from flask import Flask, jsonify, request
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
    image_df = pd.read_csv("../data/image_data.csv")
    patient_id = image_df.patient_id.unique()[int(patient_index) - 1]
    has_tumor_indices = read_mri(image_df, patient_id)[2]
    return jsonify(has_tumor_indices)


@app.route("/add_point_coordinates/<patient_index>/<tumor_indice>", methods=["POST"])
def add_point_coordinate(patient_index, tumor_indice):
    mousePoints = request.get_json()["points"]
    # print("mousePoints", mousePoints)
    image_df = pd.read_csv("../data/image_data.csv")
    patient_id = image_df.patient_id.unique()[int(patient_index) - 1]
    image_stack, mask_stack, tumor_indices = read_mri(image_df, patient_id)
    img = image_stack[int(tumor_indice) - 1, :, :, 1].astype("float") / 255

    # convert points to int
    # print("points", mousePoints)
    points = np.round(mousePoints).astype("int")

    # design gradient-based metric
    gauss = gaussian_filter(img, 1)
    gx = np.gradient(gauss, axis=0)
    gy = np.gradient(gauss, axis=1)
    metric = 1 / (1e-4 + gx**2 + gy**2)

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
    for c in curves:
        plt.plot(c[:, 1], c[:, 0], c="yellow")

    plt.subplot(132), plt.imshow(dist_map, "jet"), plt.title("Distance map")
    for c in curves:
        plt.plot(c[:, 1], c[:, 0], c="r")
    plt.scatter(points[:, 1], points[:, 0], c="y")

    plt.subplot(133), plt.imshow(img, "gray"), plt.title("Result")
    for c in curves[:-1]:
        plt.plot(c[:, 1], c[:, 0], c="r")
    plt.plot(c[-1, 1], c[-1, 0], c="r", label="Fast-Marching")
    contours = find_contours(mask_stack[int(tumor_indice)], 1)
    for contour in contours:
        plt.plot(contour[:, 1], contour[:, 0], c="b", label="GT")

    plt.legend()
    plt.savefig("test.png")
    # plt.show()
    return "200"


if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    app.run()

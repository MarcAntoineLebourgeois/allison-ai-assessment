import cv2, os

base_path1 = "../data/kaggle_3m/TCGA_CS_4941_19960909/"
base_path2 = "../data/kaggle_3m/TCGA_CS_4942_19970222/"
base_path3 = "../data/kaggle_3m/TCGA_CS_4943_20000902/"
base_path4 = "../data/kaggle_3m/TCGA_CS_4944_20010208/"
base_path5 = "../data/kaggle_3m/TCGA_CS_5393_19990606/"
new_path = "../front-end/src/images/"


def convert_file_in_folder(folder):
    """Convert all files in the folder from tif to png format into frontend/images"""
    for infile in os.listdir(folder):
        print("file : " + infile)
        read = cv2.imread(folder + infile)
        outfile = infile.split(".")[0] + ".png"
        cv2.imwrite(new_path + outfile, read, [int(cv2.IMWRITE_JPEG_QUALITY), 200])


convert_file_in_folder(base_path1)
convert_file_in_folder(base_path2)
convert_file_in_folder(base_path3)
convert_file_in_folder(base_path4)
convert_file_in_folder(base_path5)

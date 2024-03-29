"""Convert all files in the folder from tif to png format into frontend/images"""
import os
import cv2

PATH1 = "../data/kaggle_3m/TCGA_CS_4941_19960909/"
PATH2 = "../data/kaggle_3m/TCGA_CS_4942_19970222/"
PATH3 = "../data/kaggle_3m/TCGA_CS_4943_20000902/"
PATH4 = "../data/kaggle_3m/TCGA_CS_4944_20010208/"
PATH5 = "../data/kaggle_3m/TCGA_CS_5393_19990606/"
DEFAULT_PATH = "../front-end/src/images/"
RESULT_FILE_NAME = "../front-end/src/images/results.png"


def create_images_folder():
    """Create the folder that will store images in front-end"""
    # Check whether the specified path exists or not
    isExist = os.path.exists(DEFAULT_PATH)
    if not isExist:
        # Create a new directory because it does not exist
        os.makedirs(DEFAULT_PATH)


def convert_file_in_folder(folder):
    """Conversion function"""
    for infile in os.listdir(folder):
        print("file : " + infile)
        read = cv2.imread(folder + infile)
        outfile = infile.split(".")[0] + ".png"
        cv2.imwrite(DEFAULT_PATH + outfile, read, [int(cv2.IMWRITE_JPEG_QUALITY), 200])


def generate_empty_result_image():
    """Generate empty result image"""
    f = open(RESULT_FILE_NAME, "w+")
    f.close()


def convert_tif_to_png():
    """Create the images folder and put converted png images into it"""
    create_images_folder()
    generate_empty_result_image()
    convert_file_in_folder(PATH1)
    convert_file_in_folder(PATH2)
    convert_file_in_folder(PATH3)
    convert_file_in_folder(PATH4)
    convert_file_in_folder(PATH5)

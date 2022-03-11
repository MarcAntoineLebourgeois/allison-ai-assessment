import cv2, os

base_path = "../data/kaggle_3m/TCGA_CS_4941_19960909/"
new_path = "../data/images/"

for infile in os.listdir(base_path):
    print("file : " + infile)
    read = cv2.imread(base_path + infile)
    outfile = infile.split(".")[0] + ".png"
    cv2.imwrite(new_path + outfile, read, [int(cv2.IMWRITE_JPEG_QUALITY), 200])

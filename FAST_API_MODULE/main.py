# Load the libraries
import tensorflow as tf
import numpy as np
import shutil
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The function to inspect images using 6 DL models
def model(results_dict, img_url):

    for key in results_dict.keys():
        # load the keras h5 model
        model = tf.keras.models.load_model('models/' + key +'.h5')
        # load the image
        image = tf.keras.utils.load_img(img_url)
        # image to array conversion
        input_imgarr = tf.keras.utils.img_to_array(image)
        # Convert single image array to a batch.
        input_imgarr_batch = np.array([input_imgarr])
        # Predict the image class  
        res = model.predict(input_imgarr_batch)
        # apply the sigmoid function
        prediction = tf.nn.sigmoid(res)
        # prediction = tf.where(prediction < 0.5, 0, 1)
        results_dict[key] = float(prediction)

    return results_dict

@app.get("/")
async def root():
    return {"message": "success"}

# Testing the tensorflow configuration
@app.get('/predict/')
async def predict():

    img_url = 'skin_images/test/benign/10.jpg'
    results_dict = {"EfficientNetB7": 0, "VGG19": 0, "Inceptionv3": 0, "Xception": 0, "ResNet50": 0, "MobileNetV3": 0}
    prediction = model(results_dict, img_url)

    return prediction

# production ready code
@app.post("/upload_image/")
async def create_upload_file(image: UploadFile = File(...)):

    updated_name = str(time.time())+ "_" +image.filename
    file_location = f"images/{updated_name}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    results_dict = {"EfficientNetB7": 0, "VGG19": 0, "Inceptionv3": 0, "Xception": 0, "ResNet50": 0, "MobileNetV3": 0}
    prediction = model(results_dict, file_location)

    return [prediction]
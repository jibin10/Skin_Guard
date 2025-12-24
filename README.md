# SkinGuard – Skin Lesion Classification System
SkinGuard is an end-to-end machine learning project for classifying skin lesions as benign or malignant using deep learning.
The system includes model training, API-based inference, and a web dashboard for uploading images and viewing results.

This project was developed as part of my final project (University of London, 2023) and is intended for educational and research purposes only.

Disclaimer: This project is not a medical device and should not be used for clinical diagnosis.

### Project Overview

The application consists of:

A MEAN stack web application (Angular + Node.js + MongoDB)
A FastAPI service for model inference
Multiple fine-tuned CNN models (ResNet, MobileNet, EfficientNet, Custom CNN)
A dashboard to visualize predictions and stored results

### How to Run the Application

#### MEAN Stack Module

The MEAN_STACK_MODULE folder contains:

Angular frontend
Node.js backend

Install dependencies:
All required dependencies are listed in MEAN_STACK_MODULE/package.json.
Start the backend and frontend as per your local setup.

#### FastAPI Module

Follow the official FastAPI guide for setup:
https://fastapi.tiangolo.com/tutorial/first-steps/


### Model Training Steps
#### Download the Dataset

Download the skin lesion dataset (ISIC/Kaggle or equivalent).
Organize it into benign and malignant folders.

#### Train and Fine-Tune Models

Run the notebooks provided in the Notebooks/ folder.
Fine-tune the models using transfer learning.

#### Add Models to FastAPI

Download or save all fine-tuned models.
Copy them into: FAST_API_MODULE/models/

Custom CNN Model (JSON)
The folder: MEAN_STACK_MODULE/backend/ml_models/sg_model_1/
contains the JSON version of the custom CNN model.
This model file will be made available on request.

### Image Storage Setup

#### Create Images Folder

Inside FAST_API_MODULE, create a folder: FAST_API_MODULE/images/
This is used to store uploaded patient images.

#### Add Test Images
For testing, add a few unseen images to:
FAST_API_MODULE/skin_images/test/malignant/
FAST_API_MODULE/skin_images/test/benign/

These images can be used to validate predictions via the API.

### What the System Does

Upload a skin lesion image
Run inference using a trained CNN model
Store the prediction and metadata (persistence)
Display results on the dashboard for later review
Separate modules available for Admin, Doctor, Patients, Lab Technitiens 

### User Modules

Admin – manages users, system settings, and overall monitoring
Doctor – manage consultation, reviews patient cases and model predictions
Patients – book consultation, upload images
Lab Technicians – handles lab results
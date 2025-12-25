# SkinGuard – Skin Lesion Classification System

SkinGuard is an end-to-end machine learning project for classifying skin lesions as **benign** or **malignant** using deep learning.  
The system includes **model training**, **API-based inference**, and a **web dashboard** for uploading images and viewing results.

This project was developed as part of my **Project (University of London, 2023)** and is intended for **educational and research purposes only**.

---

##  Project Overview

The application consists of:

- A **MEAN stack web application** (Angular + Node.js + MongoDB)
- A **FastAPI service** for model inference
- **Multiple fine-tuned CNN models**, including:
  - EfficientNetB7
  - Inceptionv3
  - MobileNetV3
  - ResNet50
  - VGG19
  - Xception
  - Custom CNN
- A **dashboard** to visualize predictions and stored results
- Other User Modules

---

##  How to Run the Application

### MEAN Stack Module

The `MEAN_STACK_MODULE` folder contains:

- Angular frontend
- Node.js backend

#### Install Dependencies

All required dependencies are listed in: MEAN_STACK_MODULE/package.json


Install the dependencies and start the backend and frontend as per your local setup.

---

### FastAPI Module

The `FAST_API_MODULE` folder contains the FastAPI backend used for model inference.

Follow the official FastAPI documentation to set up and run the API: https://fastapi.tiangolo.com/tutorial/first-steps/


---

## Model Training Steps

### Download the Dataset

- Download a skin lesion dataset (ISIC / Kaggle or equivalent)
- Organize the dataset into:
  - `benign`
  - `malignant` folders

---

### Train and Fine-Tune Models

- Run the notebooks provided in the `Notebooks/` folder
- Fine-tune the models using transfer learning

---

### Add Models to FastAPI

- Save or download all fine-tuned models
- Copy the model files into: FAST_API_MODULE/models/


---

### Custom CNN Model (JSON)

The folder below contains the JSON version of the custom CNN model: MEAN_STACK_MODULE/backend/ml_models/sg_model_1/


> This model file will be **made available on request**.

---

##  Image Storage Setup

### Create Images Folder

Inside `FAST_API_MODULE`, create the following folder: FAST_API_MODULE/images/


This folder is used to store uploaded patient images.

---

### Add Test Images

For testing, add a few unseen images to:
FAST_API_MODULE/skin_images/test/malignant/
FAST_API_MODULE/skin_images/test/benign/


These images can be used to validate predictions via the API.

---

## What the System Does

- Upload a skin lesion image
- Run inference using a trained CNN model
- Store predictions and metadata (**persistence**)
- Display results on the dashboard for later review
- Provides **role-based access** through separate user modules

---

## User Modules

The application includes separate modules for different user roles:

### Admin
- Manages users
- Controls system settings
- Monitors overall system activity

### Doctor
- Manages consultations
- Reviews patient cases
- Reviews model predictions

### Patients
- Book consultations
- Upload skin lesion images
- View prediction results

### Lab Technicians
- Handle lab results
- Manage test-related data

---

## License & Usage

This project is shared for **learning, academic, and portfolio purposes only**.  
It is **not approved for clinical or commercial use**.






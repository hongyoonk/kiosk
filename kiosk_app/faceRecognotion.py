import os
import cv2
import dlib
import numpy as np
import pandas as pd

detector = dlib.get_frontal_face_detector()
#sp = dlib.shape_predictor('kiosk_app/models/shape_predictor_68_face_landmarks.dat')
#facerec = dlib.face_recognition_model_v1('kiosk_app/models/dlib_face_recognition_resnet_model_v1.dat')

customer_filename = 'kiosk_app/customerDatabase.csv'

# Load the cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Function to detect faces in an image
def detect_face(image_path):
    image_path = path_amend(image_path)
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    #에러 발생 시 0으로 반환
    try:
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
        return len(faces) > 0
    except:
        return 0
    
def path_amend(image_path):
    #image_path = image_path.replace('\\', '/')
    #image_path = image_path.replace('kiosk_app/', '')
    return image_path

# # Function to save user information to CSV file
# def save_to_csv(name, age, photo_filename):
#     customer_descriptor = get_descriptors(photo_filename)
#     data = {'Name': [name], 'Age': [age], 'Photo': [customer_descriptor]}
#     df = pd.DataFrame(data)
#     if not os.path.exists(customer_filename):
#         df.to_csv(customer_filename, index=False)
#     else:
#         df.to_csv(customer_filename, mode='a', header=False, index=False)
        
# # 얼굴 사진을 dlib를 통해 128차원 벡터로 변환
# def get_descriptors(image_path):
#     image_path = path_amend(image_path)
#     img = cv2.imread(image_path)
#     dets = detector(img, 1)
#     for k, d in enumerate(dets):
#         shape = sp(img, d)
#         face_descriptor = facerec.compute_face_descriptor(img, shape)
#         return np.array(face_descriptor).astype(np.float)
         
# def face_recognition(request):
#     video_stream = request.files.get['video_stream']
    
#     # Load the database of known faces
#     df = pd.read_csv(customer_filename)
#     descriptors = []
#     images = []
#     for i, row in df.iterrows():
#         descriptors.append(np.array(row['Descriptor'].split(',')).astype(np.float))
#         images.append(row['Photo'])
    
#     # Initialize some variables
#     face_recognized = False
#     name = ''
#     age = ''
#     photo_url = ''
    
#     return {
#         'isRecognized': face_recognized,
#         'name': name,
#         'age': age,
#         'photo_url': photo_url
#     }
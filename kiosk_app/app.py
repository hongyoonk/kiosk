from flask import Flask, render_template, request, send_from_directory, jsonify
import faceRecognotion as fr
import customerOrderList as orderList
import os

app = Flask(__name__)

# Directory to store uploaded images
UPLOAD_FOLDER = 'kiosk_app\data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the 'data' directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        # Placeholder for face recognition logic
        recognition_result = fr.detect_face(request)  # Implement this function


        if recognition_result > 0:
            return jsonify({'isRecognized': True})
        # if recognition_result['isRecognized']:
        #     return jsonify({
        #         'name': recognition_result['name'],
        #         'age': recognition_result['age'],
        #         'photo_url': recognition_result['photo_url']
        #     })
        else:
            return jsonify({'isRecognized': False})

@app.route('/kiosk')
def kiosk():
    return render_template('kiosk.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        # This is for loading the signup page
        return render_template('signup.html')
    elif request.method == 'POST':
        try:
            current_directory = os.path.dirname(__file__)
            print("현재 디렉토리의 상대 경로:", current_directory)
            # Get form data
            name = request.form['name']
            age = request.form['age']
            file = request.files['photo']
            
            if file:
                filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
                file.save(filename)
            
            # Check if the uploaded photo contains a face
            if fr.detect_face(filename):
                # Save user information to CSV
                fr.save_to_csv(name, age, file.filename)
                print(f"Name: {name}, Age: {age}, Image saved as: {filename}")
                return jsonify({'status': 'success'})
            else:
                # If no face is detected, return an error status
                os.remove(filename)
                return jsonify({'status': 'error', 'message': '얼굴이 감지되지 않았습니다. 다시 사진을 등록해주세요.'})
    
        except Exception as e:
            print(f"Error: {e}")
            # Send an error response
            return jsonify({'status': 'error'})


# Serve uploaded images
@app.route('/data/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/signsuccess')
def signsuccess():
    return render_template('signsuccess.html')

@app.route('/setpackage', methods=['GET', 'POST'])
def setpackage():
    if request.method == 'GET':
        return render_template('setpackage.html')
    else:
        data = request.json  # Assuming JSON data is sent in the request
        packaging_preference = data.get('packagingPreference')
        
        #orderList.save_order_list(packaging_preference)

        # You can send a response back to the client if needed
        return jsonify({'status': 'success'})

@app.route('/order', methods=['GET', 'POST'])
def submit_order():
    if request.method == 'GET':
        # This is for loading the order page
        return render_template('order.html')
    else:
        try:
            data = request.get_json()
            total_price = data['totalPrice']
            packaging_preference = data['packagingPreference']
            order_details = data['orderDetails']


            orderList.save_order_list(total_price, packaging_preference, order_details)

            # Assume the order submission is successful and send a success response
            return jsonify({'status': 'success'})

        except Exception as e:
            print(f"Error submitting order: {e}")
            # Send an error response
            return jsonify({'status': 'error'})
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)


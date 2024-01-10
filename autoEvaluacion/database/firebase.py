import pyrebase
import logging
from flask import Flask, request, jsonify
# from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth
from firebase import firebase 
import 'firebase/firestore'





# Configuración de Firebase
firebase_config = {
    'apiKey': "AIzaSyCkpVGWMcPbmsGGC6OJ03FPKjPXIW43Sxc",
    'authDomain': "uja-database.firebaseapp.com",
    'projectId': "uja-database",
    'storageBucket': "uja-database.appspot.com",
    'messagingSenderId': "973507772035",
    'appId': "1:973507772035:web:3328b1b84074140549e5b6",
    'databaseURL': ''
}
firebase1 = firebase.
firebase = pyrebase.initialize_app(firebase_config)
auth = firebase.auth()

# auth.sign_in_with_email_and_password("guille@red.ujaen.es", "Carolina*13")
# print(auth.update_profile())


app = Flask(__name__)
# CORS(app)


# Ruta para el login
@app.route('/login', methods=['POST'])
def login():
    # data = request.get_json()
    # email = data.get('email')
    # password = data.get('password')

    try:
        # Autenticar al usuario con Firebase
        user = auth.create_user_with_email_and_password("gui1@red.ujaen.es", "password")

        # Aquí puedes realizar otras acciones después del login, si es necesario

        return jsonify({'mensaje': 'Login exitoso', 'user_id': user['localId']})
        # return "ok"
    except Exception as e:
        return jsonify({'error': str(e)})
        # return "ko"
    

if __name__ == '__main__':
    app.run(debug=True)

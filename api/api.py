from os import getenv
from dotenv import load_dotenv

from flask_jwt_extended import (
    JWTManager,jwt_required,create_access_token,
    get_jwt_identity
)
from flask.helpers import make_response
import flask_praetorian
from flask import Flask, jsonify, request

from datetime import datetime, timedelta

from functools import wraps

import pypyodbc

## Get environment variables. 
load_dotenv()

app = Flask(__name__)
# JWT Configuration
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'hours': 30}

jwt = JWTManager(app)


guard = flask_praetorian.Praetorian()


DB_URL= getenv('DB_URI')
connection = pypyodbc.connect(DB_URL)

cursor = connection.cursor()

@app.route('/login',  methods = ['POST'])
def get_current_time():
    json_data = request.get_json()
    username  = json_data['username']
    password  = json_data['password'] 
    s = cursor.execute( ''' SELECT hr_employee.emp_id, hr_employee.emp_firstName, hr_employee.emp_lastName, Users.User_code, Users.Password
				FROM  hr_employee INNER JOIN Users ON hr_employee.emp_id = Users.UDF1 
				WHERE user_code = ? AND Users.Password = ?
    ''', [username, password])
    s = cursor.fetchone()
    print(s)
    
    user = {
        "id":s[0],
        "username": s[1],
        "password": s[2]
    }
    access_token = create_access_token(identity={"email":"cesarg@fleetwooudsa.com"})
    return make_response(
        jsonify({'token': access_token,'user': user}
        ),
        200
    )

@app.route('/auth', methods=['GET'])
@jwt_required()
def test():
    print('This is SPARTA')
    return make_response(jsonify({'secrents':'companySecrets'}))


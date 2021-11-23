from os import getenv
from dotenv import load_dotenv

from flask_jwt_extended import (
    JWTManager,jwt_required,create_access_token,
    get_jwt_identity
)
from flask.helpers import make_response
import flask_praetorian
from flask import Flask, json, jsonify, request

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
def get_login_info():
    json_data = request.get_json(force=True)

    username    = json_data['username']
    password    = json_data['password'] 
    employeeId  = json_data['employeeId']
    if (username and password):
        findUser = cursor.execute( ''' SELECT hr_employee.emp_id, hr_employee.emp_firstName, hr_employee.emp_lastName, Users.User_code, Users.Password
				FROM  hr_employee INNER JOIN Users ON hr_employee.emp_id = Users.UDF1 
				WHERE user_code = ? AND Users.Password = ?
    ''', [username, password])
        findUser = cursor.fetchone() 
        if findUser == None:
            return make_response(
            jsonify({'error': 'User not found'})
        )

        user = {
            "id":findUser[0],
            "username": findUser[1],
            "password": findUser[2]
        }
        access_token = create_access_token(identity={"email":"cesarg@fleetwooudsa.com"})
        return make_response(
            jsonify({'token': access_token,'user': user}
            ),
            200
        )
    else:
        if(employeeId):
            findUserById = cursor.execute("""SELECT hr_employee.emp_id, hr_employee.emp_firstName, hr_employee.emp_lastName, Users.User_code,Users.Password
            FROM hr_employee INNER JOIN Users on hr_employee.emp_id = Users.UDF1 WHERE emp_id = ? """, [employeeId])
            
            findUserById = cursor.fetchone()
            if findUserById == None:
                return make_response(
                    jsonify({'error': 'User not found'}), 404
                )

            access_token = create_access_token(identity={"email":"cesarg@fleetwooudsa.com"})
            user = {
                "id":findUserById[0]
            }
            return make_response(
                jsonify({'token': access_token, 'user': user}), 202
            )
    return jsonify({'error': 'Missing username or password'}), 404


@app.route('/auth', methods=['GET'])
@jwt_required()
def test():
    print('This is SPARTA')
    return make_response(jsonify({'success':"true"}))


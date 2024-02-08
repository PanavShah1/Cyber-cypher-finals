#uvicorn data:app --reload


import mysql.connector
from random import random

import math
import datetime
from validate_email import validate_email

from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json


host = '127.0.0.1'
user = 'root'
password = 'mysqlpass'
database = 'cyber_cypher'

mydb = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)
mycursor = mydb.cursor()


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8000",  # Added a comma here
    "http://localhost:3000",
    "*",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/new-user")
async def index(listmine: dict):
    name = listmine['name']
    email = listmine['email']
    password = listmine['password']
    sql = """
        SELECT email
        FROM users
        """
    mycursor.execute(sql)
    myresult = mycursor.fetchall()

    if not validate_email(email):
        return 2
    
    for a in myresult:
        if a[0] == email:
            return 1

    sql = """
        INSERT INTO users (name, password, email)
        VALUES (%s, %s, %s);
        """
    mycursor.execute(sql, [name, password, email])
    mydb.commit()
    
    
    # user_data = {"name" : name, "email" : email, "password" : password}
    if password == "1234567890":
        return 1
    return 0

@app.post("/login")
async def index(mydict: dict):
    email = mydict['email']
    password = mydict['password']
    sql = """
        SELECT email, password
        FROM users
        """
    mycursor.execute(sql)
    myresult = mycursor.fetchall()

    for a in myresult:
        if a[0] == email and a[1] == password:
            return 1

    return 0

@app.post("/new-user-doctor")
async def index(listmine: dict):
    name = listmine['name']
    email = listmine['email']
    password = listmine['password']
    speciality = listmine['speciality']
    sql = """
        SELECT email
        FROM doctors
        """
    mycursor.execute(sql)
    myresult = mycursor.fetchall()

    if not validate_email(email):
        return 2
    
    for a in myresult:
        if a[0] == email:
            return 1

    sql = """
        INSERT INTO doctors (name, password, email, speciality)
        VALUES (%s, %s, %s, %s);
        """
    mycursor.execute(sql, [name, password, email, speciality])
    mydb.commit()
    
    
    # user_data = {"name" : name, "email" : email, "password" : password}
    if password == "1234567890": # change later
        return 1
    return 0

@app.post("/login-doctor")
async def index(mydict: dict):
    email = mydict['email']
    password = mydict['password']
    sql = """
        SELECT email, password
        FROM doctors
        """
    mycursor.execute(sql)
    myresult = mycursor.fetchall()

    for a in myresult:
        if a[0] == email and a[1] == password:
            return 1

    return 0


@app.post("/chat")
async def chat(mydict: dict):
    patient_email = mydict['emailZero']
    doctor_email = mydict['emailOne']
    # return f'{patient_email}<{doctor_email}'
    place = f'{patient_email}<{doctor_email}'
    
    table_name = place
    sql = "SELECT table_name FROM information_schema.TABLES WHERE table_name = %s"
    mycursor.execute(sql, (table_name,))
    result = mycursor.fetchone()
    flag = True #exists
    if result:
        flag = True
    else:
        flag = False

    if not flag:
        sql = f"""
            CREATE TABLE `cyber_cypher`.`{place}` (
            `code` INT NOT NULL,
            `message` VARCHAR(45) NULL);"""
        mycursor.execute(sql)

    try:
        sql = f"SELECT * FROM cyber_cypher.`{place}`;"
        mycursor.execute(sql)
        myresult = mycursor.fetchall()

        result_dict = []
        for a, b in myresult:
            result_dict.append({'type' : a, 'text' : b})

        return(result_dict)
    except Exception as e:
        return e
    
@app.post("/new-messages")
async def new_messages(mydict: dict):
    place = f'{mydict["emailZero"]}<{mydict["emailOne"]}'
    # return mydict
    try:
        for element in mydict["data"]:
            # return [element['type'], element['text']]
            # sql = f"""SELECT * FROM cyber_cypher.`{place}`"""
            # myresult = mycursor.fetchall()
            # return element
            text = element['text']
            sql = f"""
                    INSERT INTO `cyber_cypher`.`{place}` (`code`, `message`)
                    VALUES ({element['type']}, '{text}');
                    """
            mycursor.execute(sql)
            
            mydb.commit()  
    except Exception as e:
        return e

@app.post("/get-doctors")
async def get_doctors(mydict:dict):
    sql = "SELECT * FROM doctors"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    mydict = {"emailZero": None, "emailOne":None, "data": []}
    for element in myresult:
        mydict["data"].append({'name': element[0], 'email': element[2], 'speciality': element[3]})
    return mydict

@app.post("/get-patients")
async def get_doctors(mydict:dict):
    sql = "SELECT * FROM users"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    mydict = {"emailZero": None, "emailOne":None, "data": []}
    for element in myresult:
        mydict["data"].append({'name': element[0], 'email': element[2]})
    return mydict

    
    
    
    
     

# import mysql.connector
from random import random
#uvicorn myapi:app --reload

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

# mydb = mysql.connector.connect(
#     host=host,
#     user=user,
#     password=password,
#     database=database
# )
# mycursor = mydb.cursor()


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
    # name = listmine['name']
    email = listmine['email']
    password = listmine['password']
    # sql = """
    #     SELECT email
    #     FROM users
    #     """
    # mycursor.execute(sql)
    # myresult = mycursor.fetchall()

    # if not validate_email(email):
    #     return 2
    
    # for a in myresult:
    #     if a[0] == email:
    #         return 1

    # sql = """
    #     INSERT INTO users (name, password, email)
    #     VALUES (%s, %s, %s);
    #     """
    # mycursor.execute(sql, [name, password, email])
    # mydb.commit()
    
    
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
    # mycursor.execute(sql)
    # myresult = mycursor.fetchall()

    if validate_email(email):
        if password == "1234":
            return 1
        else:
            return 0
    else:
        return -1
    

    

    # for a in myresult:
    #     if a[0] == email and a[1] == password:
    #         return 0

    # return myresult

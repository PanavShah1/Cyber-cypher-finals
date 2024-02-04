import mysql.connector
from random import random
#uvicorn myapi:app --reload

import math
import datetime
from validate_email import validate_email

from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel

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
@app.post("/new-user")
def index(name:str, email:str, password:str):
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
    
    
    user_data = {"name" : name, "email" : email, "password" : password}
    return 0

@app.post("/login")
def index(email:str, password:str):
    sql = """
        SELECT email, password
        FROM users
        """
    mycursor.execute(sql)
    myresult = mycursor.fetchall()

    if not validate_email(email):
        return 2

    for a in myresult:
        if a[0] == email and a[1] == password:
            return 0

    return myresult

import mysql.connector
from random import random
import math
import datetime

host = '127.0.0.1'
user = 'root'
password = 'mysqlpass'
database = 'mydatabase'

mydb = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)
mycursor = mydb.cursor()
mycursor.execute("CREATE SCHEMA `cyber_cypher` ;")
sql = """
    CREATE TABLE `cyber_cypher`.`users` (
    `id` INT NOT NULL,
    `name` VARCHAR(45) NULL,
    `password` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    PRIMARY KEY (`id`));
"""
mycursor.execute(sql)

"""
CREATE TABLE `cyber_cypher`.`doctors` (
  `name` INT NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`));
  ALTER TABLE `cyber_cypher`.`doctors` 
ADD COLUMN `speciality` VARCHAR(45) NULL AFTER `email`;
ALTER TABLE `cyber_cypher`.`doctors` 
CHANGE COLUMN `name` `name` VARCHAR(45) NULL DEFAULT NULL ;
"""

DROP DATABASE IF EXISTS locsSmithdb;
CREATE DATABASE locsSmithdb;
USE locsSmithdb;

CREATE TABLE categories
(
    username varchar(55) NOT NULL,
    password varchar(99) NOT NULL,
    lastname varchar(55) NOT NULL,
    firstname varchar(55) NOT NULL,
    addr varchar(55) NOT NULL,
    phone INT(11),
    email varchar(99),
    longitude varchar(20),
    latitude varchar(20),
    clientrating INT(1),
    braiding BOOLEAN,
    hairlocs BOOLEAN
);
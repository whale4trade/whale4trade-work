
/* Replace with your SQL commands */

 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  number NUMERIC(11) NOT NULL,
  imgProfile VARCHAR(400),
  balance VARCHAR(400),
  idNF VARCHAR(300),
  idNB VARCHAR(300),
  statusAccess VARCHAR(200),
   bundleId uuid REFERENCES bundle(id) ,
  bundleName VARCHAR(255) REFERENCES bundle(name),
  tree VARCHAR(200),
  win VARCHAR(200)
  
 );
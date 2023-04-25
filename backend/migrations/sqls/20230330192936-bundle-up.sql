 /* Replace with your SQL commands */

 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 CREATE TABLE bundle(
 id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
 name VARCHAR(255) UNIQUE NOT NULL,
 price VARCHAR(200),
 win VARCHAR(200),
 timeCreated DATE ,
 ImgBundle VARCHAR(400),
 category VARCHAR(200)
 )

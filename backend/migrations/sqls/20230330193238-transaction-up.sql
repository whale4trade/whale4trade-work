
/* Replace with your SQL commands */
 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 CREATE TABLE transaction(
 id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
 userId uuid REFERENCES users(id),
 category VARCHAR(400),
 price VARCHAR(200) ,
 timeJoin date
 )
;
/* Replace with your SQL commands */

/* Replace with your SQL commands */
 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

 CREATE TABLE orders(
 id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
 bundleId uuid REFERENCES bundle(id) ,
 name VARCHAR(255) REFERENCES bundle(name) ,
 userId uuid REFERENCES users(id),
  timeWin VARCHAR(200) ,
 price VARCHAR(200),
 win VARCHAR(200),
 timeBuy VARCHAR(200)
 )
;
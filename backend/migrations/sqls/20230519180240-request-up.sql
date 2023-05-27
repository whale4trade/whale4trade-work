/* Replace with your SQL commands */
CREATE TABLE request(
 id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
 userId uuid REFERENCES users(id),
 userEmail VARCHAR(255) REFERENCES users(email),
 phone VARCHAR(255) ,
 price VARCHAR(50),
 timeReq VARCHAR(500) ,
 status VARCHAR(100)
);
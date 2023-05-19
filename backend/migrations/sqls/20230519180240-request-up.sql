/* Replace with your SQL commands */
CREATE TABLE request(
 id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
 userId uuid REFERENCES users(id),
 price VARCHAR(50),
 timeReq VARCHAR(500) ,
 status VARCHAR(100)
);
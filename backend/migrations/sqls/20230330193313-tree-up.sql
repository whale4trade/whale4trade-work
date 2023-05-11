
 /* Replace with your SQL commands */
 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tree(
id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
userId uuid REFERENCES users(id),
iamEmail VARCHAR(255) UNIQUE NOT NULL REFERENCES users(email),
timeJoin date,
bundle VARCHAR(255)
)
;
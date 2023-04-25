/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE dol(
id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    dollar VARCHAR(255)
)
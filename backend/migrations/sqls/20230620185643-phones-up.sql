CREATE TABLE phones(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    phonenumber  NUMERIC(11) NOT NULL
);
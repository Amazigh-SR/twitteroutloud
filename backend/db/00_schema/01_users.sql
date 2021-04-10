DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL,
  twitter_id INTEGER PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255),
  secret_token VARCHAR(255),
  verified BOOLEAN
);
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL,
  twitter_id BIGINT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255),
  secret_token VARCHAR(255),
  image_url VARCHAR(255),
  settings JSON
);
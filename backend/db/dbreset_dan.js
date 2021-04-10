const db = require("./pool");

/**
 * DROP and RESET the user tab;e
 * @param
 * @returns the new user id.
 */
const dbReset_dan = function () {
  queryParams = [];
  queryString = `
  DROP TABLE IF EXISTS users CASCADE;

  CREATE TABLE users (
    id SERIAL,
    twitter_id BIGINT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    secret_token VARCHAR(255),
    image_url VARCHAR(255)
  );
  `;
  return db.query(queryString, queryParams).then((res) => {
    console.log("reset user table successfully!");
  });
};

dbReset_dan();

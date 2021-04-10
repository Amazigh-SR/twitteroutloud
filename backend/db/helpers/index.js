const db = require("../pool");

const createOrFindByTwitterID = function (
  twitter_id,
  username,
  email,
  token,
  secret_token,
  image_url
) {
  getUserByID(twitter_id).then((rows) => {
    console.log("rows:", rows);
    if (rows) {
      console.log("Got em", rows);
      return rows;
    } else {
      return addUser(
        twitter_id,
        username,
        email,
        token,
        secret_token,
        image_url
      );
    }
  });
};
exports.createOrFindByTwitterID = createOrFindByTwitterID;

/**
 * Insert a new user into the database
 * @param
 * @returns the new user id.
 */
const addUser = function (
  twitter_id,
  username,
  email,
  token,
  secret_token,
  image_url
) {
  queryParams = [twitter_id, username, email, token, secret_token, image_url];
  queryString = `
    INSERT INTO users (twitter_id, username, email, token, secret_token, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  return db.query(queryString, queryParams).then((res) => res.rows[0]);
};
exports.addUser = addUser;

/**
 * Query db by twitter_id
 * @param number
 * @returns the new user id.
 */
const getUserByID = function (twitter_id) {
  queryParams = [twitter_id];
  queryString = `
    SELECT * FROM users
    WHERE twitter_id = $1;
  `;
  return db.query(queryString, queryParams).then((res) => res.rows[0]);
};
exports.getUserByID = getUserByID;

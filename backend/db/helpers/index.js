const db = require("../pool");

/**
 * Insert a new user into the database
 * @param
 * @returns the new user id.
 */
const addUser = function (twitter_id, username, email, token, secret_token, image_url) {
  queryParams = [twitter_id, username, email, token, secret_token, image_url];
  queryString = `
    INSERT INTO users (twitter_id, username, email, token, secret_token, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  return db.query(queryString, queryParams).then((res) => res.rows)
};
exports.addUser = addUser;

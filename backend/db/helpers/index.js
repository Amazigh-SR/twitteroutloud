const db = require("../pool");

/**
 * Insert a new user into the database
 * @param
 * @returns the new user id.
 */
const addUser = function () {
  queryParams = [];
  queryString = `
    INSERT INTO users (id, username, email, token, secret_token)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  return db.query(queryString, queryParams).then((res) => res.rows[0].id);
};
exports.addUser = addUser;

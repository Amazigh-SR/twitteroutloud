const db = require("../pool");

const createOrFindByTwitterID = function (
  twitter_id,
  username,
  email,
  token,
  secret_token,
  image_url
) {
  return getUserByID(twitter_id).then((row) => {
    if (row !== undefined) {
      return updateUserTokens(twitter_id, token, secret_token)
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
  return db.query(queryString, queryParams).then(res => {
    console.log(`Successfully added Twitter User: ${twitter_id} to database!`);
    return res.rows[0]
  });
};
exports.addUser = addUser;

/**
 * update user tokens if user is already in database
 * @param 
 * @returns the new user id.
 */
const updateUserTokens = function (
  twitter_id,
  token,
  secret_token
  ) {
    queryParams = [twitter_id, token, secret_token];
    queryString = `
    UPDATE users SET token = $2, secret_token = $3
    WHERE twitter_id = $1
    RETURNING *;
    `;
  return db.query(queryString, queryParams).then(res => {
    console.log(`Updated tokens for Twitter User: ${twitter_id} successfully!`)
    return res.rows[0]
  });
};
exports.updateUserTokens = updateUserTokens;

/**
 * update user settings if user is already in database
 * @param 
 * @returns the new user id.
 */
 const updateUserSettings = function (
  twitter_id,
  settings
  ) {
    queryParams = [twitter_id, settings];
    queryString = `
    UPDATE users SET settings = $2
    WHERE twitter_id = $1
    RETURNING *;
    `;
  return db.query(queryString, queryParams).then(res => {
    console.log(`Updated settings for Twitter User: ${twitter_id} successfully!`)
    return res.rows[0]
  });
};
exports.updateUserSettings = updateUserSettings;

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

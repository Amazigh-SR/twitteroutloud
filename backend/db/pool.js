// load .env data into process.env
require("dotenv").config();

// PG database client/connection setup
const { Pol } = require("pg");
const dbParams = require("./params");
const db = new Pool(dbParams);

module.exports = {
  query: (text, params, callback) => {
    return db.query(text, params, callback);
  },
};

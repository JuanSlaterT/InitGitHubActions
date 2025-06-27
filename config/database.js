const promise = require("bluebird");
const postgresqlPG = require("./configPG");

let options = {
  // Initialization Options
  promiseLib: promise,
};

let pgp = require("pg-promise")(options);

const db = pgp(postgresqlPG);

module.exports = {
  db,
};

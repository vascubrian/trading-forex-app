'use strict';
const jwt = require('jsonwebtoken');

function createToken (username, password, sessionSecret, urlBase, pageBase, loggedUser, loggedInUrl) {
  return jwt.sign({
    username,
    password,
    urlBase,
    pageBase,
    loggedUser,
    loggedInUrl
  }, sessionSecret, { expiresIn: 3600000 });
}

module.exports = { createToken };

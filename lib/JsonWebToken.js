'use strict';
const jwt = require('jsonwebtoken');

function createToken (username, password, sessionSecret) {
  return jwt.sign({
    username,
    password
  }, sessionSecret, { expiresIn: 3600000 });
}

module.exports = { createToken };

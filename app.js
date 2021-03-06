const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const jsonWebToken = require('./lib/JsonWebToken');
require('console-stamp')(console, '[HH:MM:ss.l]');

// application config
const { config, envConfig } = require('./lib/config');
const basicAuthKeys = require('./lib/BasicAuthKeys.js');
const mysqlConnector = require('./lib/MysqlConnector');

// session settings
app.use(
  session({
    secret: config.sessionSecret,
    expires: 3600000,
    saveUninitialized: true,
    resave: true,
    id: 'appUsers'
  })
);

// form handler
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Mapping the EJS template engine to ".html" files
app.engine('html', require('ejs').renderFile);

// public
app.use(express.static(path.join(__dirname, '/public')));

// welcome controller
router.get('/', (req, res) => {
  // checks whether user is loggedin
  if (req.session.email != null) {
    return res.redirect('/dashboard');
  }

  // application welcome page & its variables
  res.render(path.resolve(__dirname, './views/index.html'), {
    appTitle: config.appTitle,
    appOwner: config.appOwner,
    aboutApplication: config.aboutApplication
  });
});

// login handler
router.get('/login', (req, res) => {
  // checks whether user is loggedin
  if (req.session.email != null) {
    return res.redirect('/');
  }

  // application login page
  res.render(path.resolve(__dirname, './views/UserAccounts/login.html'), {
    appTitle: config.appTitle,
    apiToken: jsonWebToken.createToken(basicAuthKeys.keys.username, basicAuthKeys.keys.password, config.sessionSecret, envConfig.urlBase, 'Login', req.sessionStore.sessions, envConfig.loggedInUrl)
  });
});

// signup handler
router.get('/signup', (req, res) => {
  // checks whether user is loggedin
  if (req.session.email != null) {
    return res.redirect('/');
  }

  // application signup
  res.render(path.resolve(__dirname, './views/UserAccounts/signup.html'), {
    appTitle: config.appTitle,
    apiToken: jsonWebToken.createToken(basicAuthKeys.keys.username, basicAuthKeys.keys.password, config.sessionSecret, envConfig.urlBase, 'Signup', req.sessionStore.sessions, envConfig.loggedInUrl)
  });
});

// dashboard controller
router.get('/dashboard', (req, res) => {
  // checks whether user is loggedin
  if (req.session.email != null) {
    return res.render(path.resolve(__dirname, './views/dashboard.html'), {
      appTitle: config.appTitle,
      appOwner: config.appOwner,
      email: req.session.email,
      apiToken: jsonWebToken.createToken(basicAuthKeys.keys.username, basicAuthKeys.keys.password, config.sessionSecret)
    });
  }

  // application welcome page & its variables
  res.render(path.resolve(__dirname, './views/index.html'), {
    appTitle: config.appTitle,
    appOwner: config.appOwner,
    aboutApplication: config.aboutApplication
  });
});

// register user
router.post('/register-userAccount', (req, res) => {
  // checks whether user is loggedin
  if (req.session.email != null) {
    return res.redirect('/');
  }
  // register user
  const email = req.body.email;
  const password = req.body.password;
  try {
    mysqlConnector.connection.query('SELECT * FROM cwg_users WHERE email = ?', [email], function (error, results) {
      if (results.length > 0) {
        console.log(error);
        res.status(400).json({ message: 'User email already exists' });
      } else {
        mysqlConnector.connection.query('INSERT INTO cwg_users (email,password,account_status) VALUES (?,?,?)', [email, password, 'PENDING'], function (error, results, fields) {
          if (results) {
            req.session.email = email;
            res.status(200).json({ message: 'your account has been created successfully' });
          } else {
            res.status(400).json({ message: 'Failed to create account (' + error + ')' });
          }
        });
      }
    });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create account-' + err });
  }
});

// login user
router.post('/login-userAccount', (req, res) => {
  // checks whether user is loggedin
  if (req.session.email != null) {
    return res.redirect('/');
  }
  // login user
  const email = req.body.email;
  const password = req.body.password;
  try {
    mysqlConnector.connection.query('SELECT * FROM cwg_users WHERE email = ? and password = ?', [email, password], function (error, results) {
      if (results.length > 0) {
        req.session.email = email;
        res.status(200).json({ message: 'Logged successfully' });
      } else {
        console.log(error);
        res.status(400).json({ message: 'Invalid credentials' });
      }
    });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create account-' + err });
  }
});

// logout
router.get('/logout', (req, res) => {
  // kill express session
  req.session.destroy((err) => {
    if (err) {
      console.error(`APP002--[LOGOUT]${envConfig.apiDefault}.app: Killing Express Session 'FAILED' ${err}`);
      return res.json({ status: 'failed', message: err });
    }

    res.redirect('/');
  });
});

// add the router
app.use('/', router);
// server port
app.listen(envConfig.port);
console.log('Running at Port ' + envConfig.port);

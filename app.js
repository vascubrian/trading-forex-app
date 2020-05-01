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
const helper = require('./lib/helper.js');
// const mysqlConnector = require('./lib/MysqlConnector');

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

// auto login
router.get('/autologin', (req, res) => {
  req.session.email = req.query.email;
  req.session.fullName = req.query.fullName;
  req.session.facility = req.query.facility;
  req.session.userType = req.query.userType;
  res.redirect('/');
});

// dashboard controller
router.get('/dashboard', (req, res) => {
  // checks whether user is loggedin
  if (req.session.email != null) {
    return res.render(path.resolve(__dirname, helper.userDashboard(req.session.userType).page), {
      appTitle: config.appTitle,
      appOwner: config.appOwner,
      email: req.session.email,
      pagePartial: helper.userDashboard(req.session.userType).pagePartial,
      fullName: req.session.fullName,
      facility: req.session.facility,
      userType: req.session.userType,
      apiToken: jsonWebToken.createToken(basicAuthKeys.keys.username, basicAuthKeys.keys.password, config.sessionSecret, envConfig.urlBase, req.session.userType, req.sessionStore.sessions, envConfig.loggedInUrl)
    });
  }

  // application welcome page & its variables
  res.render(path.resolve(__dirname, './views/index.html'), {
    appTitle: config.appTitle,
    appOwner: config.appOwner,
    aboutApplication: config.aboutApplication
  });
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

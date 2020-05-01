const path = require('path');

const configPath = path.resolve(__dirname, '..', process.env.CONFIG_DIR);
const envConfigPath = path.resolve(configPath, `application-${process.env.NODE_ENV || 'dev'}.json`);
const config = require(path.resolve(configPath, 'application.json'));
const envConfig = require(envConfigPath);

module.exports = {
  config,
  envConfig
};

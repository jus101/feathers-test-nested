const organisations = require('./organisations/organisations.service.js');
const assets = require('./assets/assets.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(organisations);
  app.configure(assets);
};

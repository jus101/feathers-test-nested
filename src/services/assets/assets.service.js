// Initializes the `assets` service on path `/assets`
const createService = require('feathers-nedb');
const createModel = require('../../models/assets.model');
const hooks = require('./assets.hooks');
const filters = require('./assets.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'assets',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/assets', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('assets');
  service.hooks(hooks);

  app.use('/organisations/:orgId/assets', app.service('assets'));
  app.service('/organisations/:orgId/assets').hooks({
    before: {
      find(hook) {
        hook.params.query.organisation = hook.params.orgId;
      }
    }
  });



  if (service.filter) {
    service.filter(filters);
  }
};

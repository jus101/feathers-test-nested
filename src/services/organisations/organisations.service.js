// Initializes the `organisations` service on path `/organisations`
const createService = require('feathers-nedb');
const createModel = require('../../models/organisations.model');
const hooks = require('./organisations.hooks');
const filters = require('./organisations.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'organisations',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/organisations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organisations');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

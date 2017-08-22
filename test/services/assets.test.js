const assert = require('assert');
const app = require('../../src/app');
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest/client');
const request = require('request');

describe('\'assets\' service', () => {
  before(done => {
    this.server = app.listen(3030);
    this.server.once('listening', () => {
      this.client = feathers()
        .configure(hooks())
        .configure(rest('http://localhost:3030').request(request));
      done();
    });
  });

  it('registered the service', () => {
    const service = app.service('assets');

    assert.ok(service, 'Registered the service');
  });

  it('creates an organisation', async () => {
    this.org = await this.client.service('organisations')
      .create({ name: 'Test Org' });
  });

  it('creates an asset that belongs to an organisation', async () => {
    this.asset = await this.client.service(`organisations/${this.org._id}/assets`)
      .create({ name: 'Test Asset', organisation: this.org._id });
  });

  it('gets an asset that belongs to an organisation', async () => {
    await this.client.service(`organisations/${this.org._id}/assets`).get(this.asset._id);
  });
});

'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const REPO = 'shaikbhasha/zapiercli' // CHANGE THIS

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('issue trigger', () => {
  zapier.tools.env.inject();

  // Make sure there's an open issue to fetch here!
  it('should get an issue', (done) => {
    console.log(process.env.TEST_USERNAME,process.env.TEST_PASSWORD)
    const bundle = {
      authData: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
      },
      inputData: {
        filter: 'all',
        state: 'all',
        repo: REPO
      }
    };
    appTester(App.triggers.issue.operation.perform, bundle)
      .then((response) => {
        response.should.be.an.instanceOf(Array);
        done();
      })
      .catch(done);
  });

  it('should create an issue', (done) => {
    console.log(process.env.TEST_USERNAME,process.env.TEST_PASSWORD)
    const bundle = {
      authData: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
      },
      inputData: {
        repo: REPO,
        title: 'Test Issue',
        body: 'This is a test issue created from an automated test for the Zapier GitHub Example App'
      }
    };
    appTester(App.creates.issue.operation.perform, bundle)
      .then((response) => {

        done();
      })
      .catch(done);
  });
});

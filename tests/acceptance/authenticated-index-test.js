import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';


module('Acceptance | authenticated', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    await authenticateSession({
      authToken: '12345',
      otherData: 'some-data'
    });
  });

  test('visiting / will redirect user to his home folder', async function (assert) {
    /*
    * Make sure that authenticated.index routes redirects to user's home folder
    */
    await visit('/'); // visit root url
    assert.strictEqual(currentURL(), '/nodes/2'); // user is redirected to home folder
  });

  test('visiting /nodes/1/ will land user in his home folder', async function (assert) {
    await visit('/nodes/1/');
    assert.strictEqual(currentURL(), '/nodes/1/');
  });
});

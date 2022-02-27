import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';


module('Acceptance | roles', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    await authenticateSession({
      authToken: '12345',
      otherData: 'some-data'
    });
  });


  test('visiting /roles', async function (assert) {
    await visit('/roles');

    assert.strictEqual(currentURL(), '/roles');
    assert.dom('.roles-add').hasText('New', 'The user can add new role');
  });
});

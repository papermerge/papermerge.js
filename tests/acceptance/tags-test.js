import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { authenticateSession } from 'ember-simple-auth/test-support';



module('Acceptance | tags', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    await authenticateSession({
      authToken: '12345',
      otherData: 'some-data'
    });
  });

  test('visiting /tags', async function (assert) {
    await visit('/tags');

    assert.equal(currentURL(), '/tags');
    assert.dom('.add-tag').hasText('New', 'The user can add new tag');
  });
});

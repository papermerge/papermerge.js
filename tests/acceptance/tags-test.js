import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | tags', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /tags', async function (assert) {
    await visit('/tags');

    assert.equal(currentURL(), '/tags');
    assert
      .dom('.add-tag')
      .hasText('New', 'The user can add new tag');
  });
});

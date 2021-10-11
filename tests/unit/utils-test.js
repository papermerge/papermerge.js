import { module, test } from 'qunit';
import group_perms_by_model from 'papermerge/utils';

class FakeContentType {
  constructor(name) {
    this.name = name;
  }

  get(whatever) {
    return this.name;
  }
}


module('Unit | Utility', function() {
  test('group_perms_by_model works for basic case', function(assert) {
      let grouped_permissions,
        permissions,
        expected_result,
        models,
        expected_models,
        areSetsEqual;

      permissions = [
        {
          attr_1x: 'attr_1x',
          attr_2x: 'attr_2x',
          content_type: new FakeContentType('m1')
        },
        {
          attr_1y: 'attr_1y',
          attr_2y: 'attr_2y',
          content_type: new FakeContentType('m1')
        },
        {
          attr_1z: 'attr_1z',
          attr_2z: 'attr_2z',
          content_type: new FakeContentType('m1')
        },
        {
          attr_1w: 'attr_1w',
          attr_2w: 'attr_2w',
          content_type: new FakeContentType('m2')
        },
      ];

      expected_result = [
        {
          model: new FakeContentType('m1'),
          perms: [
            {
              attr_1x: 'attr_1x',
              attr_2x: 'attr_2x',
              content_type: new FakeContentType('m1')
            },
            {
              attr_1y: 'attr_1y',
              attr_2y: 'attr_2y',
              content_type: new FakeContentType('m1')
            },
            {
              attr_1z: 'attr_1z',
              attr_2z: 'attr_2z',
              content_type: new FakeContentType('m1')
            },
          ]
        },
        {
          model: new FakeContentType('m2'),
          perms: [
            {
              attr_1w: 'attr_1w',
              attr_2w: 'attr_2w',
              content_type: new FakeContentType('m2')
            },
          ]
        }
      ];

      grouped_permissions = group_perms_by_model(permissions);

      assert.strictEqual(
        grouped_permissions.length, expected_result.length
      );

      models = new Set(grouped_permissions.map(item => item.model));
      expected_models = new Set(['m1', 'm2']);

      areSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
      assert.true(areSetsEqual(models, expected_models));

  });
});
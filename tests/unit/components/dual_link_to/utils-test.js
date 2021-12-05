import { module, test } from 'qunit';
import { route_name } from 'papermerge/components/dual_link_to/utils';

class FakeNodeDocument {
  get() {
    return "document";
  }
}


class FakeNodeFolder {
  get() {
    return "folder";
  }
}


module('Unit | Components | DualLinkTo | Utils', function () {

  test('route_name for document node on the left', function (assert) {
    let hint, node;

    hint = "left";
    node = new FakeNodeDocument();

    assert.strictEqual(
      route_name({hint, node}),
      "authenticated.document"
    );
  });

  test('route_name for folder node on the left', function (assert) {
    let hint, node;

    hint = "left";
    node = new FakeNodeFolder();

    assert.strictEqual(
      route_name({hint, node}),
      "authenticated.nodes"
    );
  });

  test('route_name for folder the right and node on left', function (assert) {
    /**
      In this use case route_name is called from a panel on the right.
      On left panel there is commander opened with nodes.
    */
    let hint, node, extranode;

    hint = "right";
    node = new FakeNodeFolder();
    extranode = new FakeNodeFolder();

    assert.strictEqual(
      route_name({hint, node, extranode}),
      "authenticated.nodes"
    );
  });

  test('route_name for folder on right and doc on left', function (assert) {
    /**
      In this use case route_name is called from a panel on the right.
      On left panel there is document viewer.
    */
    let hint, node, extradoc;

    hint = "right";
    node = new FakeNodeFolder();
    extradoc = new FakeNodeDocument();

    assert.strictEqual(
      route_name({hint, node, extradoc}),
      "authenticated.document"
    );
  });
});
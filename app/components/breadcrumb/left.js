import BaseBreadcrumbComponent from "./base";


class LeftBreadcrumbComponent extends BaseBreadcrumbComponent {
  url(extranode) {
    let node = this.args.node;

    if (extranode) {
      return `/nodes/${node.id}?extranode_id=${extranode.id}`
    }

    return `/nodes/${node.id}`;
  }
}

export default LeftBreadcrumbComponent;

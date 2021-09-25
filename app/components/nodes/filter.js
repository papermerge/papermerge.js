import Component from '@glimmer/component';

export default class NodesFilterComponent extends Component {
  get results() {
    let { docs, query } = this.args;

    if (query) {
      docs = docs.filter((doc) => doc.title.includes(query));
    }

    return docs;
  }
}

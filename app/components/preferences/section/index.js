import Component from '@glimmer/component'


export default class SectionComponent extends Component {
  get section_name() {
    return this.args.name;
  }

  get icon_class() {
    const name = this.args.name;

    if (name === 'ocr') {
      return 'fa fa-eye';
    }

    if (name === 'localization') {
      return 'fa fa-globe-americas';
    }

    return 'fa fa-cogs';
  }
}
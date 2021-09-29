import { attr } from '@ember-data/model';
import NodeModel from './node';

export default class TagModel extends NodeModel {
    @attr name
    @attr fg_color;
    @attr bg_color;
    @attr description;
    @attr pinned;
}

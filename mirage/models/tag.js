import { Model } from 'ember-cli-mirage';
import faker from 'faker';


export default Model.extend({
    name() {
        return faker.lorem.word();
    },

    fg_color() {
        return "#ff0000";
    },

    bg_color() {
        return "#ff0000";
    },

    description() {
        return faker.lorem.sentence();
    },

    pinned() {
        return true;
    }
});

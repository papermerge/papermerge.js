import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TagsController extends Controller {

    @action
    onToggleNew() {
        this.set('new', !this.new);
    }

    @action
    onCreate() {
        this.store.createRecord('tag', {
            name: this.new_name,
            description: this.new_description,
            pinned: true,
            bg_color: "#ff0000",
            fg_color: "#ffffff"
        }).save();

        this.set('new_name', "");
        this.set('new_description', "");
        this.set('new_fg_color', "#ffffff");
        this.set('new_bg_color', "#ff0000");
        this.set('new', false);
    }

    @action
    onCancel() {
        this.set('new', false);
        this.set('new_name', "");
        this.set('new_description', "");
        this.set('new_fg_color', "#ffffff");
        this.set('new_bg_color', "#ff0000");
    }
}

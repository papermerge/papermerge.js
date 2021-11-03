import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";


export default class NodesController extends Controller {
  queryParams = ['extranode_id'];
}

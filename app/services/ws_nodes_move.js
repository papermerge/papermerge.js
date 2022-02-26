import WSBaseService  from 'papermerge/services/ws/base';


export default class WSNodesMove extends WSBaseService {
  url() {
    return '/nodes/move/';
  }
}
import WSBaseService  from 'papermerge/services/ws/base';


export default class Websockets extends WSBaseService {
  url() {
    return '/document/';
  }
}
import WSBaseService from 'papermerge/services/ws/base';


export default class WSInboxRefresh extends WSBaseService {
  url() {
    return '/nodes/inbox-refresh/';
  }
}
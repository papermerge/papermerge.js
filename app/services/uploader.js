import Service from '@ember/service';
import { service } from '@ember/service';


export default class Uploader extends Service {

  @service requests;

  upload({files, lang, parent_id}) {
    console.log(
      `Uploading files=${files} lang=${lang} parent_id=${parent_id}`
    );
  }
}
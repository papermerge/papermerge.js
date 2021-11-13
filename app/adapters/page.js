import ApplicationAdapter from './application';


export default class NodeAdapter extends ApplicationAdapter {

  getBinaryImage(page_id) {
    let url, headers;

    url = this.buildURL('pages', page_id);

    headers = this.headers;
    headers['Accept'] = 'image/jpeg';

    return fetch(url, {
      method: 'GET',
      headers: headers
    });
  }

  async loadBinaryImages(pages) {
    let all_proms = pages.map((page) => {
      // fetch binary image here
      return this.getBinaryImage(page.id).then(
        response => response.blob()
      ).then((image_blob) => {
        const image_object_url = URL.createObjectURL(image_blob);
        page.url = image_object_url;
      });
    });

    await Promise.all(all_proms);
    return pages;
  }
}
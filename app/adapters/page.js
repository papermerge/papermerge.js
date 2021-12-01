import ApplicationAdapter from './application';


export default class PageAdapter extends ApplicationAdapter {

  async getImage(page_id, accept='image/jpeg') {
    /*
    * Requests binary image/jpeg from backend of the
    * page model based on `page_id`
    */
    let url, headers_copy = {};

    url = this.buildURL('pages', page_id);

    // Important! don't change original this.headers
    // otherwise `PageAdapter` will continue
    // accepting only 'image/jpeg' content type for all subsequent requests
    Object.assign(headers_copy, this.headers);  // create a copy of `this.headers`
    headers_copy['Accept'] = accept;

    return fetch(url, {
      method: 'GET',
      headers: headers_copy
    });
  }

  async loadImage(page, accept='image/jpeg') {
    /*
    * Requests page's image from backend

      It can request image/jpeg or image/svg+xml. In case it asks
      for image/svg+xml media type and svg image is not available,
      server will return jpeg instead.
      Server will return 404 only in case neither svg nor jpeg images
      are available.
    */
    let response,
      image_blob,
      image_object_url;

    response = await this.getImage(page.id, accept);
    if (response.headers.get('content-type') == 'image/svg+xml') {
      page.svg_image = await response.text();
    } else {
      image_blob = await response.blob();
      image_object_url = URL.createObjectURL(image_blob);
      page.url = image_object_url;
    }

    return page;
  }

  async loadImages(pages, accept='image/jpeg') {
    let all_proms,
      pages_with_url;

    all_proms = pages.map(
      (page) => this.loadImage(page, accept)
    );

    pages_with_url = await Promise.all(all_proms);
    return pages_with_url;
  }
}
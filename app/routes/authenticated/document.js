import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import { getPanelInfo } from './utils';


export default class DocumentRoute extends Route {
  @service store;

  queryParams = {
    extranode_id: {
      refreshModel: true
    },
    extradoc_id: {
      refreshModel: true
    }
  };

  async model(params) {
    let //doc_adapter,
      page_adapter,
      extranode,
      doc,
      last_version,
      last_version2,
      pages_with_url,
      pages_with_url2;

    page_adapter = this.store.adapterFor('page');

    doc  = await this.store.findRecord(
      'document',
      params.document_id,
      { reload: true }
    );

    last_version = doc.last_version;

    pages_with_url = await page_adapter.loadBinaryImages(last_version.pages);

    if (params.extradoc_id) {
      doc  = await this.store.findRecord(
        'document',
        params.extradoc_id,
        { reload: true }
      );
      last_version2 = doc.last_version
      pages_with_url2 = await page_adapter.loadBinaryImages(last_version2.pages);

      return {
        'document_version': last_version,
        'pages': pages_with_url,
        'extra_document_version': last_version2,
        'extra_pages': pages_with_url2,
      };
    }

    if (params.extranode_id) {

      extranode = await getPanelInfo({
        store: this.store,
        node_id: params.extranode_id,
        page: 1
      });

      return {
        'document_version': last_version,
        'pages': pages_with_url,
        'extranode': extranode
      };
    }

    return {
      'doc': doc,
      'document_versions': doc.versions,
      'last_document_version': last_version,
      'pages': pages_with_url
    };
  }

  renderTemplate() {
    this.render('authenticated.viewer');
  }
}

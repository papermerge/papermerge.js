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
      extra_doc,
      last_version,
      extra_last_version,
      pages_with_url,
      extra_pages_with_url;

    page_adapter = this.store.adapterFor('page');

    doc  = await this.store.findRecord(
      'document',
      params.document_id,
      { reload: true }
    );

    last_version = doc.last_version;

    pages_with_url = await page_adapter.loadImages(last_version.pages, 'image/svg+xml');

    if (params.extradoc_id) {
      extra_doc  = await this.store.findRecord(
        'document',
        params.extradoc_id,
        { reload: true }
      );
      extra_last_version = extra_doc.last_version
      extra_pages_with_url = await page_adapter.loadImages(
        extra_last_version.pages
      );

      return {
        'doc': doc,
        'document_versions': doc.versions,
        'last_document_version': last_version,
        'pages': pages_with_url,
        'extra': {
          'doc': extra_doc,
          'document_versions': extra_doc.versions,
          'last_document_version': extra_last_version,
          'pages': extra_pages_with_url,
        }
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

import Route from '@ember/routing/route';
import { service } from '@ember/service';

import { getPanelInfo } from './utils';


export default class DocumentRoute extends Route {
  @service store;
  @service requests;

  queryParams = {
    extra_id: {
      refreshModel: true
    },
    extra_type: {
      refreshModel: true
    }
  };

  async model(params) {
    let //doc_adapter,
      extranode,
      doc,
      extra_doc,
      last_version,
      extra_last_version,
      pages_with_url,
      extra_pages_with_url;

    doc = await this.store.findRecord(
      'document',
      params.document_id,
      { reload: true }
    );

    last_version = doc.last_version;

    pages_with_url = last_version.pages.map(
      (page) => this.requests.loadImage.perform(page, 'image/svg+xml')
    );

    if (params.extra_id && params.extra_type === 'doc') {
      extra_doc  = await this.store.findRecord(
        'document',
        params.extra_id,
        { reload: true }
      );
      extra_last_version = extra_doc.last_version;
      extra_pages_with_url = this.requests.loadImages.perform(
        extra_last_version.pages,
        'image/svg+xml'
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

    if (params.extra_id && params.extra_type === 'folder') {

      extranode = await getPanelInfo({
        store: this.store,
        node_id: params.extra_id,
        page: 1
      });

      return {
        'doc': doc,
        'document_versions': doc.versions,
        'last_document_version': last_version,
        'pages': pages_with_url,
        'extra': {
          'current_node':extranode.current_node,
          'children':extranode.children,
          'pagination':extranode.pagination
        }
      };
    }

    return {
      'doc': doc,
      'document_versions': doc.versions,
      'last_document_version': last_version,
      'pages': pages_with_url
    };
  }
}

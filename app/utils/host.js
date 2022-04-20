import ENV from 'papermerge/config/environment';


function base_url() {
  /*
  Returns backend's REST API base url.

  base url is extracted from `window` object, which
  means this method is valid only in browser environment.

  Notice there is no `/` at the end of returned string.
  */
  let base = `${window.location.protocol}//${window.location.host}`;

  if (ENV.APP.HOST) {
    // user can override BACKEND HOST by providing
    // ENV.APP.HOST value
    // e.g. ENV.APP.HOST = 'http://127.0.0.1:8000';
    base = ENV.APP.HOST;
  }

  if (!ENV.APP.NAMESPACE) {
    return base;
  }

  return `${base}/${ENV.APP.NAMESPACE}`;
}


function ws_base_url() {
  /*
  websockets base url
  */
  let base = `ws://${window.location.host}`;

  if (document.location.protocol == 'https:') {
    base = `wss://${window.location.host}`;
  }

  if (ENV.APP.WS_HOST) {
    // user can override BACKEND HOST by providing
    // ENV.APP.HOST value
    // e.g. ENV.APP.HOST = 'ws://127.0.0.1:8000';
    base = ENV.APP.WS_HOST;
  }

  if (!ENV.APP.WS_NAMESPACE) {
    return base;
  }

  return `${base}/${ENV.APP.WS_NAMESPACE}`;
}


export {
  base_url,
  ws_base_url,
};

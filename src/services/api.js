/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';

export default class API {
  constructor(url) {
    this.url = url;
  }

  _request(path = '', params = {}) {
    params.headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...params.headers,
    });

    return fetch(this.url + path, params)
      .then(response => {
        if (response.status < 200 || response.status > 300) {
          throw new Error('API error');
        }
        return response.json();
      })
      .catch(error => {
        console.error('API Error', error);
      });
  }

  get(path, params) {
    return this._request(path, {
      ...params,
      method: 'GET',
    });
  }

  post(path, params) {
    return this._request(path, {
      ...params,
      method: 'POST',
    });
  }

  put(path, params) {
    return this._request(path, {
      ...params,
      method: 'PUT',
    });
  }

  delete(path, params) {
    return this._request(path, {
      ...params,
      method: 'DELETE',
    });
  }
}

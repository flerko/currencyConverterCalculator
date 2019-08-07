/* eslint-disable no-console */
import axios from 'axios';

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

    return axios(this.url + path, params)
      .then(response => {
        if (response.status < 200 || response.status > 300) {
          throw new Error('API error');
        }
        return response.data;
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
}

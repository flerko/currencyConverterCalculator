/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { store } from '../store/configureStore';

function getTokenFromCookies() {
  return localStorage.getItem('access_token');
}

export default class API {
  constructor(url, token) {
    this.url = url;
    this.token = token;
    this.loadingCount = 0;
  }

  _getToken() {
    return this.token || getTokenFromCookies();
  }

  _request(path = '', params = {}) {
    params.headers = new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${this._getToken()}`,
      'Content-Type': 'application/json',
      ...params.headers,
    });

    this.loadingCount++;

    if (this.loadingCount === 1) {
      store.dispatch(showLoading());
    }

    return fetch(this.url + path, params)
      .then(response => {
        if (response.status < 200 || response.status > 300) {
          throw new Error('API error');
        }
        return response.json();
      })
      .catch(error => {
        console.error('API Error', error);
      })
      .finally(() => {
        this.loadingCount--;

        if (this.loadingCount === 0) {
          store.dispatch(hideLoading());
        }
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

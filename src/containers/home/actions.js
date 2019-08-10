import config from '../../config';
import API from '../../services/api';
import types from './types';
import get from 'lodash/get';

const api = new API(config.global.REACT_APP_BACK_URL + config.global.REACT_APP_API_URL);

export function getData() {
  return dispatch => {
    api.get('/daily_json.js').then(response => {
      const GBP = get(response, 'Valute.GBP');
      const USD = get(response, 'Valute.USD');
      const EUR = get(response, 'Valute.EUR');
      dispatch({
        type: types.GET_CURRENCIES_SUCCESS,
        currencies: response,
        necessaryCurrencies: [GBP, USD, EUR],
      });
    });
  };
}

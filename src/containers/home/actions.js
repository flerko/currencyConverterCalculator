import config from '../../config';
import API from '../../services/api';
import types from './types';
import get from 'lodash/get';

const api = new API(config.global.REACT_APP_BACK_URL + config.global.REACT_APP_API_URL);

export function getCurrenciesData() {
  return dispatch => {
    api.get('/daily_json.js').then(response => {
      const RUB = {
        CharCode: 'RUB',
        Name: 'Российский рубль',
        Value: 1,
      };
      const GBP = get(response, 'Valute.GBP');
      const USD = get(response, 'Valute.USD');
      const EUR = get(response, 'Valute.EUR');
      dispatch({
        type: types.GET_CURRENCIES_SUCCESS,
        currencies: response,
        necessaryCurrencies: [RUB, GBP, USD, EUR],
      });
    });
  };
}

export function setConversionStorage(lastConversion) {
  return (dispatch, getStore) => {
    let conversionStorage = getStore().home.conversionStorage;
    conversionStorage = conversionStorage.slice(Math.max(0, conversionStorage.length - 9));
    conversionStorage.push(lastConversion);
    sessionStorage.setItem('conversionStorage', JSON.stringify(conversionStorage));
    dispatch({
      type: types.SET_CONVERSION_STORAGE,
      conversionStorage: conversionStorage,
    });
  };
}

export function setConversionStorageFromSessionStorage() {
  const conversionStorage = JSON.parse(sessionStorage.getItem('conversionStorage')) || [];
  return dispatch => {
    dispatch({
      type: types.SET_CONVERSION_STORAGE_FROM_SESSION_STORAGE,
      conversionStorage: conversionStorage,
    });
  };
}

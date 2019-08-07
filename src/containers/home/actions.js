import config from '../../config';
import API from '../../services/api';
import types from './types';

console.log(config.global);

const api = new API(config.global.REACT_APP_BACK_URL + config.global.REACT_APP_API_URL);

export function getData() {
  return dispatch => {
    api.get('/daily_json.js').then(data => {
      console.log(data);
      dispatch({
        type: types.GET_DATA_SUCCESS,
        data: data,
      });
    });
  };
}

import types from './types';

const initialState = {
  currencies: {},
  necessaryCurrencies: [],
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.currencies, necessaryCurrencies: action.necessaryCurrencies };
    default:
      return state;
  }
}

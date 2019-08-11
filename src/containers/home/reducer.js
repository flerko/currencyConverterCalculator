import types from './types';

const initialState = {
  currencies: {},
  necessaryCurrencies: [],
  conversionStorage: [],
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.currencies, necessaryCurrencies: action.necessaryCurrencies };

    case types.SET_CONVERSION_STORAGE:
      return { ...state, conversionStorage: action.conversionStorage };

    case types.SET_CONVERSION_STORAGE_FROM_SESSION_STORAGE:
      return { ...state, conversionStorage: action.conversionStorage };

    default:
      return state;
  }
}

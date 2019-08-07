import types from './types';

const initialState = {
  data: {}
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_DATA_SUCCESS:
      return { ...state, data: action.data };
    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import { homeReducer } from '../containers/home/reducer';

export const rootReducer = combineReducers({
  home: homeReducer,
});

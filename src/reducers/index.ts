import {combineReducers} from 'redux';
// app level reducer
import app from './app.reducer';

const state = {
  app,
};

const rootReducer = combineReducers(state);

export default rootReducer;

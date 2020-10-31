import {fork, spawn} from 'redux-saga/effects';
import {getInfoWatcher} from './app.sagas';

function* rootSagas() {
  yield [fork(getInfoWatcher)];
}

export default rootSagas;

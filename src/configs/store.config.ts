import {Platform} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from '../reducers';
import rootSagas from '../sagas';
import Reactotron from './reactoron.config';

var store: any = null;

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const configureStore = () => {
  if (store) return store;
  let enhancers;

  if (Platform.OS !== 'web' && __DEV__) {
    const composeWithDevTools = require('redux-devtools-extension')
      .composeWithDevTools;
    enhancers = composeWithDevTools(
      applyMiddleware(...middlewares),
      Platform.OS === 'android' || Platform.OS === 'ios'
        ? // @ts-ignore
          Reactotron.createEnhancer()
        : undefined,
    );
  } else {
    // production env - exclude dev tools
    enhancers = compose(applyMiddleware(...middlewares));
  }

  store = createStore(rootReducers, enhancers);

  sagaMiddleware.run(rootSagas);
  return store;
};
export default configureStore();

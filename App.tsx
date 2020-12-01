import React from 'react';
import {Provider} from 'react-redux';
import store from '@/configs/store.config';
import FirstScreen from '@/screens/first_screen/wrapper';

const App = () => (
  <Provider store={store}>
    <FirstScreen />
  </Provider>
);

export default App;

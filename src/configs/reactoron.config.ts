import {AsyncStorage, NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

let scriptHostname;
let reactoron = {};
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
  // @ts-ignore
  console.log = Reactotron.log;
  // @ts-ignore
  reactoron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({host: scriptHostname})
    .use(reactotronRedux())
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
}

export default reactoron;

import {AppRegistry} from 'react-native'
import Appp from './app.json'
import App from './App'

AppRegistry.registerComponent(Appp.name, () => App)

AppRegistry.runApplication(Appp.name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
})

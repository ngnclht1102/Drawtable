import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const hasNotch = DeviceInfo.hasNotch()
export const iosHasNotch = Platform.OS === 'ios' && DeviceInfo.hasNotch()
export const screenInfo = Dimensions.get('window')

const baseWidth = 375
const baseHeight = 667
const ratioWidth = screenInfo.width / baseWidth
const ratioHeight = screenInfo.height / baseHeight

export const isIos = Platform.OS === 'ios'

export const rSizeH = (w: number) => ratioWidth * w
export const rSizeV = (h: number) => ratioHeight * h

export const rSize = (
  smallIOS: number,
  regularIOS: number,
  bigIOS: number,
  biggerIOS: number,
  smallAndroid: number,
  regularAndroid: number,
  bigAndroid: number,
  biggerAndroid: number
) => {
  switch (true) {
    case screenInfo.width >= 1024:
      return isIos ? biggerIOS : biggerAndroid
    case screenInfo.width >= 812:
      return isIos ? bigIOS : bigAndroid
    case screenInfo.width >= 612:
      return isIos ? regularIOS : regularAndroid
    case screenInfo.width >= 320:
      return isIos ? smallIOS : smallAndroid
    default:
      return isIos ? regularIOS : regularAndroid
  }
}

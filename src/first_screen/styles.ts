import { StyleSheet, Platform } from 'react-native'
import {
  rSizeV,
  rSizeH,
  screenInfo,
  iosHasNotch
} from '@/configs/metrics.config'
import colors from '@/configs/colors.config'

const HOZ_SPACING = rSizeH(40)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: HOZ_SPACING,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray
  },
  f1: { flex: 1 },
  txtTitle: {
    fontSize: rSizeH(32),
    fontWeight: '900',
    textAlign: 'center',
    marginTop: iosHasNotch
      ? rSizeV(70)
      : Platform.OS === 'ios'
      ? rSizeV(60)
      : rSizeV(40),
    color: colors.mainColor
  },
  middle: {
    height: '45.0405%',
    justifyContent: 'center'
  },
  img: {
    width: '78.6667%',
    resizeMode: 'contain'
  },
  txt: {
    fontSize: 16,
    color: '#59817D',
    textAlign: 'center',
    marginTop: 42
  },
  bottomView: {
    alignItems: 'center',
    marginTop: 42
  },
  version: {
    color: '#928F8F',
    textAlign: 'center'
  }
})

export default styles

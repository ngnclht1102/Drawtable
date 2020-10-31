/**
 * Helper to Save, Load, Delete data from local storage
 */
import { AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const ACCESS_TOKEN = '@app-v2:ACCESS_TOKEN'
export const IS_FIRST_TIME = '@app-v2:IS_FIRST_TIME'
export const FIRST_INSTALL_AT_BUILD = '@app-v2:FIRST_INSTALL_AT_BUILD'

// needed for code push
export async function setFirstInstallAtWhatBuild() {
  const firstInstallAtBuild = await AsyncStorage.getItem(FIRST_INSTALL_AT_BUILD)
  console.log('inside setFirstInstallAtWhatBuild')
  console.log(
    'inside setFirstInstallAtWhatBuild ALREADY SET BUILD',
    firstInstallAtBuild
  )
  if (!firstInstallAtBuild) {
    console.log(
      'inside setFirstInstallAtWhatBuild SET BUILD',
      DeviceInfo.getBuildNumber()
    )
    await AsyncStorage.setItem(
      FIRST_INSTALL_AT_BUILD,
      DeviceInfo.getBuildNumber()
    )
  }
}

export async function saveAccessToken(accessToken: string) {
  return await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
}

export async function loadAccessToken() {
  return await AsyncStorage.getItem(ACCESS_TOKEN)
}

export async function removeAccessToken() {
  return await AsyncStorage.removeItem(ACCESS_TOKEN)
}

export async function isFirstTime() {
  return await AsyncStorage.getItem(IS_FIRST_TIME)
}

export async function setFirstTime(value: boolean) {
  return await AsyncStorage.setItem(IS_FIRST_TIME, value ? 'true' : 'false')
}

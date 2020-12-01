import {Dimensions, Platform} from 'react-native';

export const rH = (w: any) => w;
export const rW = (w: any) => w;

export const screenInfo = Dimensions.get('window');

export const isIos = Platform.OS === 'ios';

import React from 'react';
import {View, Image, StatusBar, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import images from '@/assets/images';
import colors from '@/configs/colors.config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as t from '@/actionTypes';
import actions from '@/actions';
// @ts-ignore
import Screen from './index';

const mapDispatchToProps = (dispatch: any) => ({
  act: bindActionCreators(actions, dispatch),
});

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);

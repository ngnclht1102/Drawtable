import React from 'react';
import {View, Image, StatusBar, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import images from '@/assets/images';
import colors from '@/configs/colors.config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Component from './index.shared';
import actions from '@/actions';
import styles from './styles';

interface WelcomeProps {
  act: any;
}

export class Welcome extends React.PureComponent<WelcomeProps> {
  state: any = {
    label: '',
    version: '',
    description: '',
  };

  componentDidMount() {}

  render() {
    return <Component state={this.state} />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  act: bindActionCreators(actions, dispatch),
});

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

import React from 'react';
import * as t from '@/actionTypes';
import actions from '@/actions';
import {View, Image, StatusBar, Text} from 'react-native';
import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import images from '@/assets/images';
import colors from '@/configs/colors.config';
import Component from './index.shared';
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

  componentDidMount() {
    CodePush.getUpdateMetadata().then((metadata: any) => {
      this.setState({
        label: metadata ? metadata.label : '',
        version: metadata ? metadata.appVersion : '',
        description: metadata ? metadata.description : '',
      });
    });

    this.props.act[t.GET_APP_INFO_REQUEST]();
  }
  render() {
    return <Component state={this.state} />;
  }
}

export default Welcome;

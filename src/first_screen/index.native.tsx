import React from 'react';
import * as t from '@/actionTypes';
import actions from '@/actions';
import {View, Image, StatusBar, Text} from 'react-native';
import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import images from '@/assets/images';
import colors from '@/configs/colors.config';
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
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.lightGray} />
        <Image source={images.logo} style={styles.img} />
        <Text style={styles.txt}>
          #athoughtfullworld - {'\n'}where mental health is as aspirational as
          physical health
        </Text>
        <View style={styles.bottomView}>
          <Text style={styles.version}>
            {DeviceInfo.getVersion()}.
            {this.state.label ? `${this.state.label}.` : ''}
            {DeviceInfo.getBuildNumber()}
          </Text>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default Welcome;

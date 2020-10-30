import React from 'react'
import { View, Image, StatusBar, Text } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import images from '@/assets/images'
import colors from '@/configs/colors.config'
import styles from './styles'

interface WelcomeProps {}

export class Welcome extends React.PureComponent<WelcomeProps> {
  state: any = {
    label: '',
    version: '',
    description: ''
  }
  componentDidMount() {
    console.log('kaka');
    
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.lightGray} />
        <Image source={images.userDashboard2} />
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
    )
  }
}

export default Welcome

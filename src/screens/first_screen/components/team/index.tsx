import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import styles from './styles';

const Team = ({name}: {name: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

export default Team;

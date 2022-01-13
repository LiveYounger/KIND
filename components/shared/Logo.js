import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogoImage from '../../assets/images/live-younger-logo.svg';
import { uGapBottomXl } from '../../styles/utilities';
import variables from '../../styles/variables';

const Logo = () => (
  <View style={uGapBottomXl}>
    <LogoImage style={styles.image} fill={variables.colors.white} />
    <Text style={styles.text}>Kind</Text>
  </View>
);

export default Logo;

const styles = StyleSheet.create({
  image: {
    height: 60,
    marginBottom: variables.gutters.md
  },
  text: {
    color: variables.colors.white,
    fontSize: variables.fontSize.screenTitle,
    fontWeight: variables.fontWeight.bold,
    textAlign: 'center'
  }
});

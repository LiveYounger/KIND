import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  btnBase,
  btnGradientWrap,
  btnTransparent,
  iconBtnTextLabelWhite
} from '../../styles/buttons';
import { uFlexRow, uTextBold } from '../../styles/utilities';
import variables from '../../styles/variables';
import PropTypes from 'prop-types';
import Layout from '../../constants/Layout';

function UnlockPremiumButton({ onPress }) {
  return (
    <LinearGradient
      colors={[variables.colors.lightBlue, variables.colors.darkBlue]}
      start={{ x: 0, y: 1 }}
      style={[btnGradientWrap, uFlexRow]}
    >
      <TouchableOpacity style={styles.premiumBtn} onPress={onPress} activeOpacity={0.75}>
        <Text style={[iconBtnTextLabelWhite, uTextBold]}>Unlock Premium</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

UnlockPremiumButton.propTypes = {
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  premiumBtn: {
    ...btnBase,
    ...btnTransparent,
    width: Layout.window.width - variables.gutters.md + 3
  }
});

export default UnlockPremiumButton;

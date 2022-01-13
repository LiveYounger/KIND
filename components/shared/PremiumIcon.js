import React from 'react';
import PropTypes from 'prop-types';

import LockIcon from '../../assets/icons/lock.svg';
import { StyleSheet } from 'react-native';
import { iconBase } from '../../styles/icons';
import variables from '../../styles/variables';

const PremiumIcon = ({ visible }) =>
  visible ? <LockIcon style={styles.premiumIcon} fill={variables.colors.white} /> : null;

PremiumIcon.propTypes = {
  visible: PropTypes.bool
};

const styles = StyleSheet.create({
  premiumIcon: {
    ...iconBase,
    left: variables.gutters.base,
    position: 'absolute',
    top: variables.gutters.base
  }
});

export default PremiumIcon;

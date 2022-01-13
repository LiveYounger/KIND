import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import variables from '../../styles/variables';
import { uPadXs } from '../../styles/utilities';

const HeaderBackButton = ({ navigation }) => (
  <TouchableOpacity style={uPadXs} onPress={() => navigation.goBack()}>
    <AntDesign name="left" size={26} color={variables.colors.white} />
  </TouchableOpacity>
);

HeaderBackButton.propTypes = {
  navigation: PropTypes.object
};

export default HeaderBackButton;

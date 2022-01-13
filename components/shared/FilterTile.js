import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import {
  btnBase,
  btnGradientWrap,
  btnMd,
  btnTransparent,
  iconBtnTextLabelWhite
} from '../../styles/buttons';
import { uGapRight, uTextWhite } from '../../styles/utilities';
import variables from '../../styles/variables';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FilterTile = ({ name, onPress, isSelected }) => (
  <LinearGradient
    style={[btnGradientWrap, uGapRight]}
    colors={[
      isSelected ? variables.colors.lightBlue : variables.colors.black,
      isSelected ? variables.colors.darkBlue : variables.colors.black
    ]}
    start={{ x: 0, y: 0.5 }}
  >
    <TouchableOpacity onPress={onPress} style={[btnBase, btnTransparent, btnMd]}>
      <Text style={isSelected ? iconBtnTextLabelWhite : uTextWhite}>{name}</Text>
    </TouchableOpacity>
  </LinearGradient>
);

FilterTile.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool
};

export default FilterTile;

import React from 'react';
import { View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';
import variables from '../../styles/variables';
import { iconBase } from '../../styles/icons';
import {
  multiSliderContainer,
  multiSliderWrapper,
  unselectedTrackStyle,
  selectedTrackStyle,
  markerStyle
} from '../../styles/multislider';

const Slider = ({
  initValue,
  onChange,
  LeadingIcon,
  TrailingIcon,
  min,
  max,
  step,
  slideLenght
}) => {
  return (
    <View style={multiSliderWrapper}>
      {LeadingIcon && <LeadingIcon style={iconBase} fill={variables.colors.white} />}
      <MultiSlider
        containerStyle={multiSliderContainer}
        selectedStyle={selectedTrackStyle}
        unselectedStyle={unselectedTrackStyle}
        markerStyle={markerStyle}
        sliderLength={slideLenght}
        values={[initValue]}
        markerOffsetX={10}
        min={min}
        max={max}
        step={step}
        onValuesChangeFinish={onChange}
      />
      {TrailingIcon && <TrailingIcon style={iconBase} fill={variables.colors.white} />}
    </View>
  );
};

Slider.propTypes = {
  initValue: PropTypes.number,
  onChange: PropTypes.func,
  LeadingIcon: PropTypes.any,
  TrailingIcon: PropTypes.any,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  slideLenght: PropTypes.number
};

export default Slider;

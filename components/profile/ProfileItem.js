import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  uFlexGrow,
  uFlexRow,
  uFlexAlignCenter,
  uTextWhite,
  uTextRight,
  uFlexJustifyEnd
} from '../../styles/utilities';
import { listItemBtn } from '../../styles/buttons';

const ProfileItem = ({ text = null, children }) => {
  return (
    <View style={listItemBtn}>
      {!!text && <Text style={[uTextWhite, uFlexGrow]}>{text}</Text>}
      <View style={[uFlexRow, uFlexAlignCenter, uFlexGrow, uTextRight, uFlexJustifyEnd]}>
        {children}
      </View>
    </View>
  );
};

ProfileItem.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node
};

export default ProfileItem;

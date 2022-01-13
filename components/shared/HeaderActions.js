import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import IconAction from './IconAction';
import { uFlexAlignCenter, uFlexJustifyBetween, uFlexRow, uPadTop } from '../../styles/utilities';

const HeaderActions = ({ actions }) => {
  const renderActions = () => {
    return actions.map((action, i) => (
      <IconAction key={i} onPress={action.onPress} Icon={action.icon} />
    ));
  };

  return (
    <View style={[uFlexRow, uFlexAlignCenter, uFlexJustifyBetween, uPadTop]}>
      {renderActions()}
    </View>
  );
};

HeaderActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.any,
      onPress: PropTypes.func
    })
  )
};

export default HeaderActions;

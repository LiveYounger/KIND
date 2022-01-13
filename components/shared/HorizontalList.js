import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { uFlexRow, uPadHorMd } from '../../styles/utilities';

const HorizontalList = ({ list }) => {
  const renderList = () =>
    list.map((item, i) => (
      <View style={uFlexRow} key={i}>
        {item}
      </View>
    ));
  return (
    <ScrollView
      style={uFlexRow}
      contentContainerStyle={uPadHorMd}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {renderList()}
    </ScrollView>
  );
};

HorizontalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any)
};

export default HorizontalList;

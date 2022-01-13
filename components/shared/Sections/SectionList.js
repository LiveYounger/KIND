import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import SectionItem from './SectionItem';
import TopSectionItem from './TopSectionItem';
import { TOP_SECTIONS_TITLES } from '../../../constants';
import HorizontalList from '../HorizontalList';
import { uGapBottomLg, uGapHorMd } from '../../../styles/utilities';
import { sectionTitle } from '../../../styles/forYouScreen';

const SectionList = ({ section, navigation }) => {
  const renderItems = () => {
    const Component = TOP_SECTIONS_TITLES.includes(section.title) ? TopSectionItem : SectionItem;
    return section.items?.map((item, i) => (
      <Component key={i} item={item} navigation={navigation} />
    ));
  };

  return (
    <View style={uGapBottomLg}>
      <Text style={[sectionTitle, uGapHorMd]}>{section.title}</Text>
      {section.items ? <HorizontalList list={renderItems()} /> : null}
    </View>
  );
};

SectionList.propTypes = {
  section: PropTypes.object,
  navigation: PropTypes.object
};

export default SectionList;

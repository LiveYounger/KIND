import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

import { screenBlack, screenContent, screenWrap } from '../../../styles/screens';
import { uPadBottomXxxl, uPadTopXl2, uTextWhite } from '../../../styles/utilities';
import variables from '../../../styles/variables';
import IconPlay from '../../../assets/icons/play.svg';
import { iconBase } from '../../../styles/icons';
import { LinearGradient } from 'expo-linear-gradient';
import { btnPlayWrap, btnPlay } from '../../../styles/buttons';
import {
  sleepHeader,
  sleepImage,
  sleepHeading,
  sleepTitle,
  sleepSubTitle
} from '../../../styles/sleepScreen';
import OfflineWarning from '../OfflineWarning';

const DetailsWithDescription = ({ item, play }) => {
  return (
    <View style={[screenWrap, screenBlack]}>
      <OfflineWarning />
      <ScrollView style={screenContent} contentContainerStyle={[uPadTopXl2, uPadBottomXxxl]}>
        <View style={sleepHeader}>
          <Image source={{ uri: item.image && item.image.large_square }} style={sleepImage} />
          <BlurView intensity={95} tint="dark" style={sleepHeading}>
            <Text style={sleepTitle}>{item.title}</Text>
            <Text style={sleepSubTitle}>{item.subtitle}</Text>
          </BlurView>
        </View>

        <View style={btnPlayWrap}>
          <TouchableOpacity onPress={() => play()}>
            <LinearGradient
              style={btnPlay}
              colors={[variables.colors.lightBlue, variables.colors.darkBlue]}
              start={{ x: 0, y: 0.5 }}
            >
              <IconPlay style={iconBase} fill={variables.colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={uTextWhite}>{item.description}</Text>
      </ScrollView>
    </View>
  );
};

DetailsWithDescription.propTypes = {
  item: PropTypes.object,
  play: PropTypes.func
};

export default DetailsWithDescription;

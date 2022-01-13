import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import $t from 'react-native-i18n';
import { usePlaybackState } from 'react-native-track-player';

import { cardTitle, cardTitleSm } from '../../../styles/forYouScreen';
import {
  uFlexAlignCenter,
  uFlexGrow,
  uFlexJustifyBetween,
  uFlexRow,
  uGapBottomXs,
  uGapLeft,
  uGapTop,
  uTextSm,
  uTextWhite
} from '../../../styles/utilities';
import variables from '../../../styles/variables';
import IconPlayCircle from '../../../assets/icons/play-circle.svg';
import { iconBase, iconLg } from '../../../styles/icons';
import { activityService } from '../../../services/ActivityService';
import {
  FINISHED_ACTIVITY_RESOURCE,
  INTERRUPT_ACTIVITY_RESOURCE
} from '../../../constants/Activity';
import { delay } from 'lodash';

const TopSectionInfo = ({ sound, title, subtitle }) => {
  const { id, duration_seconds } = sound;
  const [lastActivity, setLastActivity] = useState(false);
  const [percente, setPercente] = useState(0);
  const audioState = usePlaybackState();

  const getLastActivityForSound = async () => {
    const activity = await activityService.getNonTypeActivityForSound(id);
    setLastActivity(activity);
  };

  const calcPercente = () => {
    /*eslint-disable indent */
    switch (lastActivity.resourcetype) {
      case FINISHED_ACTIVITY_RESOURCE:
        setPercente(100);
        break;
      case INTERRUPT_ACTIVITY_RESOURCE:
        setPercente(Math.round((lastActivity.seconds_listened * 100) / duration_seconds));
        break;
    }
  };

  useEffect(
    () => {
      delay(getLastActivityForSound, 1000);
    },
    [audioState]
  );

  useEffect(
    () => {
      calcPercente();
    },
    [lastActivity]
  );

  const progressInfo = () => (
    <View style={uFlexGrow}>
      <Text style={[uTextWhite, uTextSm, uGapBottomXs]}>
        {$t('section.of', { percente: percente })}
      </Text>
      <View style={styles.progress}>
        <View style={[styles.current, { width: `${percente}%` }]} />
      </View>
    </View>
  );

  return (
    <>
      <Text style={[cardTitle, cardTitleSm]}>{title}</Text>
      <Text style={uTextWhite}>{subtitle}</Text>

      <View style={[uFlexRow, uFlexAlignCenter, uFlexJustifyBetween, uGapTop]}>
        {!!lastActivity && progressInfo()}
        <IconPlayCircle style={[iconBase, iconLg, uGapLeft]} fill={variables.colors.white} />
      </View>
    </>
  );
};

TopSectionInfo.propTypes = {
  sound: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

const styles = StyleSheet.create({
  current: {
    backgroundColor: variables.colors.white,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0
  },

  progress: {
    backgroundColor: variables.colors.white30,
    borderRadius: 20,
    flexGrow: 1,
    height: variables.gutters.xs,
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  }
});

export default TopSectionInfo;

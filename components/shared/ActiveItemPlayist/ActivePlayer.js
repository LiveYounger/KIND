import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';

import ControlButton from '../TrackPlayer/ControlButton';
import PlayPauseButton from '../TrackPlayer/PlayPauseButton';
import ForwardIcon from '../../../assets/icons/forward';
import RewindIcon from '../../../assets/icons/rewind';
import { shouldDisablePrevNextButtons } from '../../../helpers/audioHelper';
import { currentAudioSelector } from '../../../store/selectors/AudioPlayerSelector';
import Picture from '../Picture';
import audioPlayerService from '../../../services/AudioPlayerService';
import { uFlexAlignCenter, uFlexGrow, uFlexRow } from '../../../styles/utilities';
import variables from '../../../styles/variables';
import Layout from '../../../constants/Layout';
import PropTypes from 'prop-types';
import { useProgress, usePlaybackState } from 'react-native-track-player';
import { BlurView } from 'expo-blur';
import { sceneFocusedSelector } from '../../../store/selectors/ScenesSelector';
// import IconClose from '../../../assets/icons/close.svg';
// import { iconBase, iconLg, iconMd, iconSm } from '../../../styles/icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const PROGRESS_UPDATE_RATE = 1000;

const ActivePlayer = ({ navigation, style }) => {
  const playbackState = usePlaybackState();
  const track = useSelector(currentAudioSelector());

  const { title, artist, artwork } = track || {};
  const [disableValues, setDisabledValues] = useState({
    disablePrevious: true,
    disableNext: true
  });

  const sceneFocused = useSelector(sceneFocusedSelector());

  const checkButtons = async () => {
    const shouldDisableButtons = await shouldDisablePrevNextButtons();
    setDisabledValues(shouldDisableButtons);
  };

  useEffect(
    () => {
      checkButtons();
    },
    [playbackState]
  );

  const { position } = useProgress(PROGRESS_UPDATE_RATE);

  return track && !sceneFocused ? (
    <BlurView intensity={97} tint="dark" style={[styles.activePlayerWrap, { ...style }]}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('AudioPlayerStack', {
            continueTrack: true,
            position
          })
        }
      >
        <View style={[uFlexRow, uFlexAlignCenter, uFlexGrow]}>
          <Picture uri={artwork || ''} style={styles.activePlayerImg} />

          <View style={styles.infoWrap}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.artist} ellipsizeMode="tail" numberOfLines={1}>
              {artist}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={[uFlexRow, uFlexAlignCenter]}>
        <ControlButton
          disabled={disableValues.disablePrevious}
          isSmall
          Icon={RewindIcon}
          onPress={audioPlayerService.skipToPrevious}
        />
        <PlayPauseButton isSmall />
        <ControlButton
          disabled={disableValues.disableNext}
          isSmall
          Icon={ForwardIcon}
          onPress={audioPlayerService.skipToNext}
        />
        {/* <TouchableOpacity onPress={onClosePress ? onClosePress : () => {}}>
          <IconClose style={[iconBase, iconSm]} fill={variables.colors.white} />
        </TouchableOpacity> */}
      </View>
    </BlurView>
  ) : null;
};

const styles = StyleSheet.create({
  activePlayerImg: {
    borderRadius: 25,
    height: variables.sizes.iconXl2,
    marginRight: variables.gutters.base,
    width: variables.sizes.iconXl2
  },

  activePlayerWrap: {
    alignItems: 'center',
    backgroundColor: variables.colors.black75,
    borderTopWidth: 1,
    bottom: variables.sizes.bottomTabBarHeight,
    flexDirection: 'row',
    height: variables.sizes.playerHeight,
    justifyContent: 'space-between',
    left: 0,
    paddingHorizontal: variables.gutters.md,
    position: 'absolute',
    right: 0,
    width: Layout.window.width
  },

  artist: {
    color: variables.colors.white50,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.sm
  },

  infoWrap: {
    maxWidth: Layout.window.width - variables.gutters.md * 2 - variables.sizes.iconXl2 - 180
  },

  title: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.semibold,
    fontSize: variables.fontSize.base,
    marginBottom: variables.gutters.xs
  }
});

ActivePlayer.propTypes = {
  navigation: PropTypes.object,
  style: PropTypes.object
};

export default ActivePlayer;

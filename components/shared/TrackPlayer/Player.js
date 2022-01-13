import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Image } from 'react-native';

import ProgressBar from './ProgressBar';
import PlayPauseButton from './PlayPauseButton';
import { useSelector } from 'react-redux';
import IconMediaPrevious from '../../../assets/icons/media-previous.svg';
import IconMediaNext from '../../../assets/icons/media-next.svg';
import variables from '../../../styles/variables';
import Layout from '../../../constants/Layout';
import { currentAudioSelector } from '../../../store/selectors/AudioPlayerSelector';
import { shouldDisablePrevNextButtons } from '../../../helpers/audioHelper';
import ControlButton from './ControlButton';
import { usePlaybackState } from 'react-native-track-player';

const Player = ({ onNext, onPrevious, initialProgress }) => {
  const currentAudio = useSelector(currentAudioSelector()) || {};
  const playbackState = usePlaybackState();
  const [disableValues, setDisabledValues] = useState({
    disablePrevious: true,
    disableNext: true
  });

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

  return (
    <View style={styles.playerWrap}>
      <View>
        <Image style={styles.cover} source={{ uri: currentAudio.artwork }} />
        <Text style={styles.title} />
        <Text style={styles.artist}>{currentAudio.artist}</Text>
      </View>

      <ProgressBar
        url={currentAudio.url}
        waveform={currentAudio.waveform}
        duration={currentAudio.duration}
        initialProgress={initialProgress}
      />

      <View style={styles.controls}>
        <ControlButton
          disabled={disableValues.disablePrevious}
          Icon={IconMediaPrevious}
          onPress={onPrevious}
        />
        <PlayPauseButton />
        <ControlButton disabled={disableValues.disableNext} Icon={IconMediaNext} onPress={onNext} />
      </View>
    </View>
  );
};

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  initialProgress: PropTypes.number
};

Player.defaultProps = {
  style: {}
};

export default Player;

const styles = StyleSheet.create({
  artist: {
    color: variables.colors.white50,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.sm,
    marginBottom: variables.gutters.base,
    textAlign: 'center'
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cover: {
    borderRadius: 20,
    height: Layout.window.height / 4,
    marginBottom: variables.gutters.md2,
    resizeMode: 'cover',
    shadowColor: variables.colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  playerWrap: {
    flexGrow: 1,
    justifyContent: 'space-between',
    marginTop: variables.gutters.xl
  },
  title: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.bold,
    fontSize: variables.fontSize.base,
    marginBottom: variables.gutters.sm,
    textAlign: 'center'
  }
});

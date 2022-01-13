import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useProgress } from 'react-native-track-player';
import variables from '../../../styles/variables';
import { getDurationString } from '../../../helpers';
import PropTypes from 'prop-types';
import Layout from '../../../constants/Layout';
import audioPlayerService from '../../../services/AudioPlayerService';
import { isApproximatelyEqual } from '../../../helpers';
import TrackPlayer from 'react-native-track-player';
import useAppState from '../../../helpers/appState';

const DEFAULT_WAVEFORM_ELEMENTS_NUM = 40;
const emptyWaveform = Array(DEFAULT_WAVEFORM_ELEMENTS_NUM).fill(0);

function ProgressBar({ waveform, duration, initialProgress }) {
  const appState = useAppState();

  const progress = useProgress(appState === 'active' ? 1000 : 10000);

  const [seeking, setSeeking] = useState(null);
  const [cachedProgress, setCachedProgress] = useState(initialProgress + 1);

  useEffect(() => {
    const eventListener = TrackPlayer.addEventListener('playback-track-changed', () => {
      setSeeking(null);
      setCachedProgress(null);
    });
    return () => {
      eventListener.remove();
    };
  }, []);

  if (seeking && isApproximatelyEqual(seeking, progress.position)) setSeeking(null);

  if (cachedProgress && progress.position >= 1) {
    setCachedProgress(null);
  }

  const displayedProgress = seeking || cachedProgress || progress.position;

  const amplitudes = waveform
    ? waveform.split(',').map(amplitude => parseInt(amplitude) / 2)
    : emptyWaveform;

  const handleSeek = async index => {
    const seekTarget = Math.floor((duration / amplitudes.length) * index);
    setSeeking(seekTarget);
    await audioPlayerService.seekTo(seekTarget);
  };

  const getElementColor = index => {
    const normalizedPosition = (displayedProgress / duration) * amplitudes.length;
    const normalizedBufferedPosition = (progress.duration / duration) * amplitudes.length;

    return normalizedPosition > index
      ? variables.colors.white
      : normalizedBufferedPosition > index
        ? variables.colors.white50
        : variables.colors.white20;
  };

  const styles = StyleSheet.create({
    amplitudeElement: (amplitude, index) => ({
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 4,
      height: isNaN(amplitude) ? 5 : amplitude + 5,
      marginLeft: 2,
      backgroundColor: getElementColor(index)
    }),
    amplitudeWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: variables.gutters.base,
      width:
        Layout.window.width -
        (variables.gutters.md + variables.gutters.base + variables.sizes.iconXl) * 2
    },
    progressWrap: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    time: {
      color: variables.colors.white,
      fontFamily: variables.fontFamily.regular,
      textAlign: 'center',
      width: variables.sizes.iconXl
    }
  });

  const amplitudeElements = amplitudes.map((amplitude, index) => (
    <TouchableWithoutFeedback key={index} onPress={() => handleSeek(index)}>
      <View key={index} style={styles.amplitudeElement(amplitude, index)} />
    </TouchableWithoutFeedback>
  ));

  return (
    <View style={styles.progressWrap}>
      <Text style={styles.time}>
        {getDurationString(isNaN(displayedProgress) ? 0 : displayedProgress)}
      </Text>
      <View style={styles.amplitudeWrapper}>{amplitudeElements}</View>
      <Text style={styles.time}>{getDurationString(isNaN(duration) ? 0 : duration)}</Text>
    </View>
  );
}

ProgressBar.propTypes = {
  waveform: PropTypes.string,
  duration: PropTypes.number,
  initialProgress: PropTypes.number
};

export default ProgressBar;

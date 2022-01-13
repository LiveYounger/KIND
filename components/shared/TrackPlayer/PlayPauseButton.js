import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import React, { useEffect, useState } from 'react';

import PauseIcon from '../../../assets/icons/pause.svg';
import PlayIcon from '../../../assets/icons/play.svg';
import { iconBase, iconLg } from '../../../styles/icons';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { btnBase, btnPlay, btnSm, btnTransparent } from '../../../styles/buttons';
import variables from '../../../styles/variables';
import audioPlayerService from '../../../services/AudioPlayerService';
import { BarIndicator } from 'react-native-indicators';

const Loader = () => <BarIndicator size={30} color={variables.colors.white} />;

let timeout = null;

const PlayPauseButton = ({ isSmall }) => {
  const playbackState = usePlaybackState();
  const [loading, setLoading] = useState(false);
  let MiddleButton = PlayIcon;

  async function togglePlayback() {
    setLoading(false);
    if (playbackState === TrackPlayer.STATE_PAUSED) {
      audioPlayerService.play();
    } else {
      audioPlayerService.pause();
    }
  }

  useEffect(
    () => {
      if (playbackState === TrackPlayer.STATE_BUFFERING || playbackState === 8) setLoading(true);
      if (playbackState === TrackPlayer.STATE_PLAYING) setLoading(false);

      if (playbackState === TrackPlayer.STATE_PAUSED)
        timeout = setTimeout(() => setLoading(false), 1000);
      if (timeout && playbackState !== TrackPlayer.STATE_PAUSED) clearTimeout(timeout);
    },
    [playbackState]
  );

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    MiddleButton = PauseIcon;
  }

  if (loading) MiddleButton = Loader;

  return (
    <TouchableOpacity style={[btnBase, btnTransparent, isSmall && btnSm]} onPress={togglePlayback}>
      {!isSmall ? (
        <LinearGradient
          style={btnPlay}
          colors={[variables.colors.lightBlue, variables.colors.darkBlue]}
          start={{ x: 0, y: 0.5 }}
        >
          <MiddleButton style={[iconBase, iconLg]} fill={variables.colors.white} />
        </LinearGradient>
      ) : (
        <MiddleButton style={iconBase} fill={variables.colors.white} />
      )}
    </TouchableOpacity>
  );
};

PlayPauseButton.propTypes = {
  isSmall: PropTypes.bool
};

export default PlayPauseButton;

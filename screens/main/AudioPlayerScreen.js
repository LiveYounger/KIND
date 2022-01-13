import React, { useEffect } from 'react';
import { View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';

import Player from '../../components/shared/TrackPlayer/Player';
import audioPlayerService from '../../services/AudioPlayerService';
import {
  itemToBePlayedSelector,
  jumpToSongSelector,
  currentAudioSelector
} from '../../store/selectors/AudioPlayerSelector';
import { setJumpToSong, setCurrentAudio } from '../../store/actions/AudioPlayerAction';
import { screenBlack, screenContent, screenPadTop, screenWrap } from '../../styles/screens';
import { uPadBottomXl } from '../../styles/utilities';
import PropTypes from 'prop-types';
import { formatSoundToTrackObject } from '../../helpers/audioHelper';
import OfflineWarning from '../../components/shared/OfflineWarning';

const AudioPlayerScreen = ({ navigation }) => {
  const itemToBePlayed = useSelector(itemToBePlayedSelector());
  const jumpToSong = useSelector(jumpToSongSelector());
  const currentAudio = useSelector(currentAudioSelector());
  const dispatch = useDispatch();

  const continueTrack = navigation.getParam('continueTrack');
  const initialProgress = navigation.getParam('position');

  useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      'playback-track-changed',
      async ({ track, nextTrack }) => {
        if (!nextTrack && currentAudio && currentAudio.id === track) {
          await audioPlayerService.seekTo(0);
          await audioPlayerService.pause();
        } else {
          const nextAudio = await TrackPlayer.getTrack(nextTrack);
          if (nextAudio) {
            dispatch(setCurrentAudio(nextAudio));
          }
        }
      }
    );

    if (!continueTrack) setup();

    return () => {
      listener.remove();
    };
  }, []);

  async function setup() {
    const soundToPlay = jumpToSong
      ? itemToBePlayed.sounds.find(sound => sound.id == jumpToSong)
      : itemToBePlayed.sounds[0];
    dispatch(setCurrentAudio(formatSoundToTrackObject(soundToPlay, itemToBePlayed)));
    await audioPlayerService.setupSleepOrMeditation(itemToBePlayed);
    await audioPlayerService.play(jumpToSong);
    dispatch(setJumpToSong(null));
  }

  return (
    <View style={[screenWrap, screenBlack]}>
      <OfflineWarning />
      <View style={[screenContent, screenPadTop, uPadBottomXl]}>
        <Player
          onNext={audioPlayerService.skipToNext}
          onPrevious={audioPlayerService.skipToPrevious}
          initialProgress={initialProgress}
        />
      </View>
    </View>
  );
};

AudioPlayerScreen.propTypes = {
  navigation: PropTypes.object
};

export default AudioPlayerScreen;

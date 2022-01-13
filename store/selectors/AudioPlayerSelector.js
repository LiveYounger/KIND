import { createSelector } from 'reselect';

const audioPlayerStateSelector = state => {
  return state.audioPlayerReducer;
};

export const itemToBePlayedSelector = () =>
  createSelector(audioPlayerStateSelector, state => state.itemToBePlayed);

export const backToScreenSelector = () =>
  createSelector(audioPlayerStateSelector, state => state.backToScreen);

export const currentAudioSelector = () =>
  createSelector(audioPlayerStateSelector, state => state.currentAudio);

export const jumpToSongSelector = () =>
  createSelector(audioPlayerStateSelector, state => state.jumpToSong);

export const wasPlayingSelector = () =>
  createSelector(audioPlayerStateSelector, state => state.wasPlaying);

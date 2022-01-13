import {
  SET_ITEM_TO_BE_PLAYED,
  SET_BACK_TO_SCREEN,
  SET_CURRENT_AUDIO,
  SET_JUMP_TO_SONG,
  SET_WAS_PLAYING
} from '../actionTypes/AudioPlayerTypes';

export const setItemToBePlayed = item => {
  return {
    type: SET_ITEM_TO_BE_PLAYED,
    payload: item
  };
};

export const setBackToScreen = screen => ({
  type: SET_BACK_TO_SCREEN,
  payload: screen
});

export const setCurrentAudio = audio => {
  return {
    type: SET_CURRENT_AUDIO,
    payload: audio
  };
};

export const setJumpToSong = soundId => {
  return {
    type: SET_JUMP_TO_SONG,
    payload: soundId
  };
};

export const setWasPlaying = payload => ({
  type: SET_WAS_PLAYING,
  payload
});

import produce from 'immer';
import {
  SET_ITEM_TO_BE_PLAYED,
  SET_BACK_TO_SCREEN,
  SET_CURRENT_AUDIO,
  SET_JUMP_TO_SONG,
  SET_WAS_PLAYING
} from '../actionTypes/AudioPlayerTypes';

const initialState = {
  itemToBePlayed: {},
  backToScreen: '',
  jumpToSong: null,
  wasPlaying: false
};

export default (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_ITEM_TO_BE_PLAYED:
        draft.itemToBePlayed = action.payload;
        break;
      case SET_BACK_TO_SCREEN:
        draft.backToScreen = action.payload;
        break;
      case SET_CURRENT_AUDIO:
        draft.currentAudio = action.payload;
        break;
      case SET_JUMP_TO_SONG:
        draft.jumpToSong = action.payload;
        break;
      case SET_WAS_PLAYING:
        draft.wasPlaying = action.payload;
    }
  });

import produce from 'immer';
import {
  SET_SCENES,
  SET_ACTIVE_SCENE,
  SET_SCENE_PREVIEW,
  SET_SCENE_MODAL_VISIBLE,
  SET_SCENE_FOCUSED
} from '../actionTypes/ScenesActionTypes';

const initialState = {
  scenes: [],
  sceneModalVisible: false,
  sceneFocused: false
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_SCENES:
        draft.scenes = action.payload;
        break;
      case SET_ACTIVE_SCENE:
        draft.activeScene = action.payload;
        break;
      case SET_SCENE_PREVIEW:
        draft.scenePreview = action.payload;
        break;
      case SET_SCENE_MODAL_VISIBLE:
        draft.sceneModalVisible = action.payload;
        break;
      case SET_SCENE_FOCUSED:
        draft.sceneFocused = action.payload;
        break;
    }
  });

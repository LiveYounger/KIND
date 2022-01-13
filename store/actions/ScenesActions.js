import {
  GET_SCENES,
  SET_SCENES,
  SET_ACTIVE_SCENE,
  SET_SCENE_PREVIEW,
  SET_SCENE_MODAL_VISIBLE,
  SET_SCENE_FOCUSED
} from '../actionTypes/ScenesActionTypes';

export const getScenes = options => ({
  type: GET_SCENES,
  payload: options
});

export const setScenes = scenes => ({
  type: SET_SCENES,
  payload: scenes
});

export const setActiveScene = activeScene => ({
  type: SET_ACTIVE_SCENE,
  payload: activeScene
});

export const setScenePreview = activeScene => ({
  type: SET_SCENE_PREVIEW,
  payload: activeScene
});

export const setSceneModalVisible = visible => ({
  type: SET_SCENE_MODAL_VISIBLE,
  payload: visible
});

export const setSceneFocused = focused => ({
  type: SET_SCENE_FOCUSED,
  payload: focused
});

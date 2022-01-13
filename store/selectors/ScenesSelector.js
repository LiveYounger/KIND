import { createSelector } from 'reselect';

const sceneStateSelektor = state => state.sceneReducer;

export const scenesSelector = () =>
  createSelector(sceneStateSelektor, scenesState => scenesState.scenes);

export const activeSceneSelector = () =>
  createSelector(sceneStateSelektor, scenesState => scenesState.activeScene);

export const scenePreviewSelector = () =>
  createSelector(sceneStateSelektor, scenesState => scenesState.scenePreview);

export const sceneModalVisibleSelector = () =>
  createSelector(sceneStateSelektor, scenesState => scenesState.sceneModalVisible);

export const sceneFocusedSelector = () =>
  createSelector(sceneStateSelektor, scenesState => scenesState.sceneFocused);

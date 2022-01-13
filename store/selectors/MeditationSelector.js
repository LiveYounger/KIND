import { createSelector } from 'reselect';

const meditationStateSelector = state => state.meditationReducer;

export const meditationsSelector = () =>
  createSelector(meditationStateSelector, meditations => meditations);

export const activeMeditationSelector = () =>
  createSelector(meditationStateSelector, meditations => meditations.active_meditation);

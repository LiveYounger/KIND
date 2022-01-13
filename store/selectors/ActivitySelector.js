import { createSelector } from 'reselect';

const activityStateSelector = state => {
  return state.activityReducer;
};

export const lastFinishedSelector = () =>
  createSelector(activityStateSelector, state => state.lastFinished);

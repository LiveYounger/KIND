import { createSelector } from 'reselect';

const sleepStateSelector = state => state.sleepReducer;

export const sleepsSelector = () => createSelector(sleepStateSelector, sleeps => sleeps);

export const activeSleepSelector = () =>
  createSelector(sleepStateSelector, sleeps => sleeps.active_sleep);

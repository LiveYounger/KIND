import { createSelector } from 'reselect';

const alarmSongStateSelector = state => state.alarmSongReducer;

export const alarmSongSelector = () => {
  return createSelector(alarmSongStateSelector, alarmState => alarmState);
};

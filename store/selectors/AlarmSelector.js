import { createSelector } from 'reselect';

const alarmStateSelector = state => state.alarmReducer;

export const alarmSelector = () => {
  return createSelector(alarmStateSelector, alarmState => alarmState);
};

export const bedTimeAlarmSelector = () => {
  return createSelector(alarmStateSelector, alarmState => alarmState.bedTimeAlarm);
};

export const wakeUpAlarmSelector = () => {
  return createSelector(alarmStateSelector, alarmState => alarmState.wakeUpAlarm);
};

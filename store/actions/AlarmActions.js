import { ALARM_OPTIONS_SET } from '../actionTypes/AlarmActionTypes';

export const setAlarmOptions = (alarmType, options) => ({
  type: ALARM_OPTIONS_SET,
  payload: { alarmType, options }
});

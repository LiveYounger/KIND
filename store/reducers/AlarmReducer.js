import produce from 'immer';
import { ALARM_PLAYING_SET } from '../actionTypes/AlarmSongActionTypes';
import { ALARM_OPTIONS_SET } from '../actionTypes/AlarmActionTypes';

const initialState = {
  isAlarmPlaying: false,
  bedTimeAlarm: {
    isActive: false,
    isPlaying: false,
    lastPlayedSoundIndex: -1,
    time: null
  },
  wakeUpAlarm: {
    isActive: false,
    isPlaying: false,
    lastPlayedSoundIndex: -1,
    time: null
  }
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    case ALARM_PLAYING_SET:
      draft.isAlarmPlaying = action.payload;
      break;
    case ALARM_OPTIONS_SET:
      if (action.payload.alarmType === 'SLEEP') {
        draft.bedTimeAlarm = action.payload.options;
      } else if (action.payload.alarmType === 'WAKE') {
        console.log('setting new wake options');
        console.log('action.payload.options', action.payload.options);
        draft.wakeUpAlarm = action.payload.options;
      }
    }
  });

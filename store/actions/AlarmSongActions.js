import {
  ALARM_SONGS_GET,
  ALARM_SONGS_SET,
  ALARM_PLAYING_SET
} from '../actionTypes/AlarmSongActionTypes';

export const getAlarmSongs = filters => ({
  type: ALARM_SONGS_GET,
  payload: filters
});

export const setAlarmSongs = payload => ({
  type: ALARM_SONGS_SET,
  payload
});

export const setAlarmPlaying = isPlaying => ({
  type: ALARM_PLAYING_SET,
  payload: isPlaying
});

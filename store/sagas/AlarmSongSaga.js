import { call, put } from 'redux-saga/effects';
import { alarmSongService } from '../../services/AlarmSongService';

import { setAlarmSongs } from '../actions/AlarmSongActions';
import { setGlobalError } from '../actions/ErrorActions';

export function* alarmSongsGet({ payload }) {
  try {
    const { data } = yield call(alarmSongService.getAlarSongs, payload);
    yield put(setAlarmSongs(data));
  } catch (err) {
    yield setGlobalError(err);
  }
}

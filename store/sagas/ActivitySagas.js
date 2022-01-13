import { call, put } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';
import { setGlobalError } from '../actions/ErrorActions';
import { activityService, ACTIVITY_TYPES } from '../../services/ActivityService';
import { setActivities, setLastFinished } from '../actions/ActivityActions';

export function* activitiesGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(activityService.getAll, payload);
    yield put(setActivities(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* lastFinishedGet() {
  try {
    yield put(setLoader(true));
    const response = yield call(activityService.getLatestActivity, ACTIVITY_TYPES.FINISH_SOUND);
    yield put(setLastFinished(response));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

import { call, put } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';
import { setGlobalError } from '../actions/ErrorActions';
import { sleepService } from '../../services/SleepService';
import { setCategoryLoading } from '../actions/CategoryActions';
import { appendSleeps, setActiveSleep, setSleeps, setSleepTabs } from '../actions/SleepActions';

export function* sleepsGet({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    const { data } = yield call(sleepService.getSleeps, payload);
    yield put(
      setSleeps({
        ...data,
        isAll: payload.categories_tabs ? false : true
      })
    );
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setCategoryLoading(false));
  }
}

export function* sleepsLoadMore({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(sleepService.getSleepsUrl, payload);
    yield put(appendSleeps(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* activeSleepGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(sleepService.getSleep, payload);
    yield put(setActiveSleep(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* sleepTabsGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(sleepService.getSleepTabs, payload);
    yield put(setSleepTabs(data));
  } catch (err) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

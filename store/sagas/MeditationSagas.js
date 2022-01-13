import { call, put } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';
import { setGlobalError } from '../actions/ErrorActions';
import { meditationService } from '../../services/MeditationService';
import {
  appendMeditations,
  setActiveMeditation,
  setMeditations,
  setMeditationTabs
} from '../actions/MeditationActions';
import { setCategoryLoading } from '../actions/CategoryActions';

export function* meditationsGet({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    const { data } = yield call(meditationService.getMeditations, payload);
    yield put(
      setMeditations({
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

export function* meditationsLoadMore({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(meditationService.getMeditationsUrl, payload);
    yield put(appendMeditations(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* activeMeditationGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(meditationService.getMeditation, payload);
    yield put(setActiveMeditation(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* meditationTabsGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(meditationService.getMeditationTabs, payload);
    console.log('DATAAAAA', data);
    yield put(setMeditationTabs(data));
  } catch (err) {
    console.log('ERRRRR', JSON.stringify(err));
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

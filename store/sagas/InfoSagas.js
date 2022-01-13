import { call, put } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';
import { setGlobalError } from '../actions/ErrorActions';
import { infoService } from '../../services/InfoService';
import { setInfo } from '../actions/InfoActions';

export function* infoGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(infoService.getInfo, payload);
    yield put(setInfo(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

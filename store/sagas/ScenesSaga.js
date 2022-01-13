import { call, put } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';
import { setScenes } from '../actions/ScenesActions';

import scenesService from '../../services/SceneService';

export function* fetchScenes({ payload }) {
  try {
    yield put(setLoader(true));
    const scenes = yield call(scenesService.getScenes);
    yield put(setScenes(scenes));
    if (payload?.play) scenesService.playScene();
  } catch (e) {
    console.log(e);
  } finally {
    yield put(setLoader(false));
  }
}

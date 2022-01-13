import { call, put } from 'redux-saga/effects';
import { shopService } from '../../services/ShopService';
import { setLoader } from '../actions/LoaderAction';

import { setShopItems, shopItemsAppend } from '../actions/ShopActions';
import { setGlobalError } from '../actions/ErrorActions';

export function* shopItemsGet({ payload }) {
  try {
    yield put(setLoader(true));

    const { data } = yield call(shopService.getShopItems, payload);
    yield put(setShopItems(data));
  } catch (err) {
    yield setGlobalError(err);
  } finally {
    yield put(setLoader(false));
  }
}

export function* shopItemsLoadMore({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(shopService.getShopItemsUrl, payload);
    yield put(shopItemsAppend(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

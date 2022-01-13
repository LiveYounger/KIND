import { call, put } from 'redux-saga/effects';
import { inAppPurchaseService } from '../../services/InAppPurchaseService';
import { setGlobalError } from '../actions/ErrorActions';
import { setLoader } from '../actions/LoaderAction';
import { setPurchasesInitialized } from '../actions/PurchaseActions';

export function* purchasesInit() {
  try {
    yield put(setPurchasesInitialized(false));
    yield put(setLoader(true));
    yield call(inAppPurchaseService.init);
    yield put(setPurchasesInitialized(true));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* subscriptionRequest({ payload }) {
  try {
    yield put(setLoader(true));
    yield call(inAppPurchaseService.requestSubscription, payload);
  } catch (error) {
    if (error.code !== 'E_USER_CANCELLED') yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* purchasesRestore({ payload }) {
  try {
    yield put(setLoader(true));
    yield call(inAppPurchaseService.restorePurchases, payload);
  } catch (error) {
    if (error.code !== 'E_USER_CANCELLED') yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

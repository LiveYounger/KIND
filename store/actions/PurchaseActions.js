import {
  INIT_PURCHASES,
  REQUEST_SUBSCRIPTION,
  RESTORE_PURCHASES,
  SET_PURCHASES_INITIALIZED
} from '../actionTypes/PurchaseActionTypes';

export const initPurchases = () => ({
  type: INIT_PURCHASES
});

export const requestSubscription = payload => ({
  type: REQUEST_SUBSCRIPTION,
  payload
});

export const restorePurchases = payload => ({
  type: RESTORE_PURCHASES,
  payload
});

export const setPurchasesInitialized = payload => ({
  type: SET_PURCHASES_INITIALIZED,
  payload
});

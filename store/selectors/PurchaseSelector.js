import { createSelector } from 'reselect';

const purchaseStateSelector = state => state.purchaseReducer;

export const purchaseInitializedSelector = () =>
  createSelector(purchaseStateSelector, purchase => purchase.isPurchaseInitialized);

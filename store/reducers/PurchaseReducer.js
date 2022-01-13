import produce from 'immer';
import { SET_PURCHASES_INITIALIZED } from '../actionTypes/PurchaseActionTypes';

const initialState = {
  isPurchaseInitialized: false
};

export default (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_PURCHASES_INITIALIZED:
        draft.isPurchaseInitialized = action.payload;
    }
  });

import produce from 'immer';
import { SHOP_ITEMS_SET, SHOP_ITEMS_APPEND } from '../actionTypes/ShopActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: []
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    case SHOP_ITEMS_SET:
      draft.count = action.payload.count;
      draft.next = action.payload.next;
      draft.previous = action.payload.previous;
      draft.results = action.payload.results;
      break;

    case SHOP_ITEMS_APPEND:
      draft.next = action.payload.next;
      draft.previous = action.payload.previous;
      draft.results = [...draft.results, ...action.payload.results];
    }
  });

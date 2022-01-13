import produce from 'immer';
import {
  LIBRARY_ITEMS_SET,
  LIBRARY_ITEMS_APPEND,
  ACTIVE_LIBRARY_ITEM_SET,
  SET_LIBRARY_TABS
} from '../actionTypes/LibraryActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  activeLibraryItem: {},
  libraryTabs: []
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case LIBRARY_ITEMS_SET:
        draft.count = action.payload.count;
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = action.payload.results;
        draft.isAll = action.payload.isAll;
        break;
      case LIBRARY_ITEMS_APPEND:
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = [...draft.results, ...action.payload.results];
        break;
      case ACTIVE_LIBRARY_ITEM_SET:
        draft.activeLibraryItem = action.payload;
        break;
      case SET_LIBRARY_TABS:
        draft.libraryTabs = action.payload;
    }
  });

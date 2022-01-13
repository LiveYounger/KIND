import produce from 'immer';
import {
  ACTIVE_MEDITATION_SET,
  MEDITATIONS_APPEND,
  MEDITATIONS_SET,
  RESET_CATEGORY_ITEMS_PAGINATION,
  SET_MEDITATION_TABS
} from '../actionTypes/MeditationActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  categories: [],
  activeMeditation: {},
  meditationTabs: []
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case MEDITATIONS_SET:
        draft.count = action.payload.count;
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = action.payload.results;
        draft.isAll = action.payload.isAll;
        break;
      case MEDITATIONS_APPEND:
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = [...draft.results, ...action.payload.results];
        break;
      case ACTIVE_MEDITATION_SET:
        draft.active_meditation = action.payload;
        break;
      case RESET_CATEGORY_ITEMS_PAGINATION:
        draft.next = null;
        draft.previous = null;
        draft.results = [];
        draft.count = 0;
        break;
      case SET_MEDITATION_TABS:
        draft.meditationTabs = action.payload;
    }
  });

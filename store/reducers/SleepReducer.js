import produce from 'immer';
import {
  ACTIVE_SLEEP_SET,
  SLEEPS_APPEND,
  SLEEPS_SET,
  SET_SLEEP_TABS
} from '../actionTypes/SleepActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  categories: [],
  active_sleep: {},
  sleepTabs: []
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SLEEPS_SET:
        draft.count = action.payload.count;
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = action.payload.results;
        draft.isAll = action.payload.isAll;
        break;
      case SLEEPS_APPEND:
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = [...draft.results, ...action.payload.results];
        break;
      case ACTIVE_SLEEP_SET:
        draft.active_sleep = action.payload;
        break;
      case SET_SLEEP_TABS:
        draft.sleepTabs = action.payload;
    }
  });

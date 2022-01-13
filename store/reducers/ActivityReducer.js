import produce from 'immer';
import { SET_ACTIVITIES, SET_LAST_FINISHED } from '../actionTypes/ActivityActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  lastFinished: null
};

export default (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_ACTIVITIES:
        draft.count = action.payload.count;
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = action.payload.results;
        break;
      case SET_LAST_FINISHED:
        draft.lastFinished = action.payload;
        break;
    }
  });

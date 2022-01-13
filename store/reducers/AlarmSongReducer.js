import produce from 'immer';
import { ALARM_SONGS_SET } from '../actionTypes/AlarmSongActionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: []
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    case ALARM_SONGS_SET:
      //because of back api route change
      if (action.payload.count) {
        draft.count = action.payload.count;
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = action.payload.results;
      } else {
        draft.results = action.payload;
      }
      break;
    }
  });

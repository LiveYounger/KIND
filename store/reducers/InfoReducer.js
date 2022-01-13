import produce from 'immer';
import { INFO_SET } from '../actionTypes/InfoActionTypes';

const initialState = {};

export default (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case INFO_SET:
        return action.payload;
    }
  });

import produce from 'immer';
import { SET_SECTIONS } from '../actionTypes/SectionActionTypes';

const initialState = {
  sections: []
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_SECTIONS:
        draft.sections = action.payload;
        break;
    }
  });

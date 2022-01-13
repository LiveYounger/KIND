import { GET_SECTIONS, SET_SECTIONS } from '../actionTypes/SectionActionTypes';

export const getSections = () => ({ type: GET_SECTIONS });
export const setSections = sections => ({
  type: SET_SECTIONS,
  payload: sections
});

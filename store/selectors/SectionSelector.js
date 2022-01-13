import { createSelector } from 'reselect';

const sectionsStateReducer = state => state.sectionsReducer;

export const sectionsSelector = () => createSelector(sectionsStateReducer, state => state.sections);

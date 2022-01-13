import { createSelector } from 'reselect';

const infoStateSelector = state => state.infoReducer;

export const infoSelector = () => createSelector(infoStateSelector, info => info);

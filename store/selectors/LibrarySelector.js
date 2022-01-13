import { createSelector } from 'reselect';

const libraryStateSelector = state => state.libraryReducer;

export const libraryItemsSelector = () => {
  return createSelector(libraryStateSelector, libraryState => libraryState);
};

export const activeLibraryItemSelector = () =>
  createSelector(libraryStateSelector, libraryState => libraryState.activeLibraryItem);

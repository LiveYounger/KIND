import {
  LIBRARY_ITEMS_GET,
  LIBRARY_ITEMS_SET,
  LIBRARY_ITEMS_LOAD_MORE,
  LIBRARY_ITEMS_APPEND,
  ACTIVE_LIBRARY_ITEM_GET,
  ACTIVE_LIBRARY_ITEM_SET,
  GET_LIBRARY_TABS,
  SET_LIBRARY_TABS
} from '../actionTypes/LibraryActionTypes';

export const getLibraryItems = filters => ({
  type: LIBRARY_ITEMS_GET,
  payload: filters
});

export const setLibraryItems = payload => ({
  type: LIBRARY_ITEMS_SET,
  payload
});

export const loadMoreLibraryItems = url => ({
  type: LIBRARY_ITEMS_LOAD_MORE,
  payload: url
});

export const appendLibraryItems = payload => ({
  type: LIBRARY_ITEMS_APPEND,
  payload
});

export const setActiveLibraryItem = payload => {
  return {
    type: ACTIVE_LIBRARY_ITEM_SET,
    payload
  };
};

export const getActiveLibraryItem = id => {
  return {
    type: ACTIVE_LIBRARY_ITEM_GET,
    payload: id
  };
};

export const getLibraryTabs = id => ({
  type: GET_LIBRARY_TABS,
  payload: id
});

export const setLibraryTabs = payload => ({
  type: SET_LIBRARY_TABS,
  payload
});

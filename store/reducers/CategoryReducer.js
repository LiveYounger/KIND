import produce from 'immer';
import {
  CATEGORIES_SET,
  CATEGORIES_ITEMS_SET,
  CATEGORIES_ITEMS_APPEND,
  ACTIVE_CATEGORY_ITEM_SET,
  SET_SELECTED_CATEGORY,
  SET_CATEGORY_LOADING,
  RESET_CATEGORY_ITEMS,
  SET_CATEGORY_TABS,
  CLEAR_CATEGORY_TABS
} from '../actionTypes/CategoryActionTypes';

const initialState = {
  otherCategories: [],
  allCategories: [],
  count: 0,
  next: null,
  previous: null,
  results: [],
  activeCategoryItem: {},
  selectedCategoryName: null,
  categoryLoading: false,
  categoryTabs: [],
  categoryTopTabs: []
};

const MAIN_CATEGORIES_NAMES = ['Meditate', 'Sleep', 'Heal'];

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case CATEGORIES_SET:
        draft.otherCategories = action.payload.results.filter(
          category => !MAIN_CATEGORIES_NAMES.includes(category.name)
        );
        draft.allCategories = action.payload.results;
        break;
      case CATEGORIES_ITEMS_SET:
        draft.count = action.payload.count;
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = action.payload.results;
        draft.isAll = action.payload.isAll;
        break;
      case RESET_CATEGORY_ITEMS:
        draft.count = 0;
        draft.next = null;
        draft.previous = null;
        draft.results = [];
        draft.isAll = false;
        break;
      case CATEGORIES_ITEMS_APPEND:
        draft.next = action.payload.next;
        draft.previous = action.payload.previous;
        draft.results = [...draft.results, ...action.payload.results];
        break;
      case ACTIVE_CATEGORY_ITEM_SET:
        draft.activeCategoryItem = action.payload;
        break;
      case SET_SELECTED_CATEGORY:
        draft.selectedCategoryName = action.payload;
        break;
      case SET_CATEGORY_LOADING:
        draft.categoryLoading = action.payload;
        break;
      case SET_CATEGORY_TABS:
        draft.categoryTabs = action.payload;
        break;
      case CLEAR_CATEGORY_TABS:
        draft.categoryTabs = [];
        break;
    }
  });

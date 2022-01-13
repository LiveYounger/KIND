import {
  CATEGORIES_SET,
  CATEGORIES_GET,
  CATEGORIES_ITEMS_GET,
  CATEGORIES_ITEMS_SET,
  CATEGORIES_ITEMS_LOAD_MORE,
  CATEGORIES_ITEMS_APPEND,
  ACTIVE_CATEGORY_ITEM_GET,
  ACTIVE_CATEGORY_ITEM_SET,
  SET_SELECTED_CATEGORY,
  SET_CATEGORY_LOADING,
  RESET_CATEGORY_ITEMS,
  RESET_CATEGORY_ITEMS_PAGINATION,
  GET_CATEGORY_TABS,
  SET_CATEGORY_TABS,
  CLEAR_CATEGORY_TABS
} from '../actionTypes/CategoryActionTypes';

export const getCategoriesItems = filters => ({
  type: CATEGORIES_ITEMS_GET,
  payload: filters
});

export const setCategories = payload => ({
  type: CATEGORIES_SET,
  payload
});

export const getCategories = () => ({
  type: CATEGORIES_GET
});

export const setCategoriesItems = payload => {
  return {
    type: CATEGORIES_ITEMS_SET,
    payload
  };
};

export const resetCategoriesItemsData = () => {
  return {
    type: RESET_CATEGORY_ITEMS
  };
};

export const loadMoreCategoriesItems = url => ({
  type: CATEGORIES_ITEMS_LOAD_MORE,
  payload: url
});

export const appendCategoriesItems = payload => ({
  type: CATEGORIES_ITEMS_APPEND,
  payload
});

export const setActiveCategoryItem = payload => ({
  type: ACTIVE_CATEGORY_ITEM_SET,
  payload
});

export const getActiveCategoryItem = id => ({
  type: ACTIVE_CATEGORY_ITEM_GET,
  payload: id
});

export const setSelectedCategory = name => ({
  type: SET_SELECTED_CATEGORY,
  payload: name
});

export const setCategoryLoading = isLoading => ({
  type: SET_CATEGORY_LOADING,
  payload: isLoading
});

export const resetCategoryItemsPagination = () => ({
  type: RESET_CATEGORY_ITEMS_PAGINATION
});

export const getCategoryTabs = id => ({
  type: GET_CATEGORY_TABS,
  payload: id
});

export const setCategoryTabs = payload => ({
  type: SET_CATEGORY_TABS,
  payload
});

export const clearCategoryTabs = () => ({
  type: CLEAR_CATEGORY_TABS
});

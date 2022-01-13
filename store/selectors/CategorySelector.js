import { createSelector } from 'reselect';

const categoryStateSelector = state => state.categoryReducer;

export const otherCategoriesSelector = () =>
  createSelector(categoryStateSelector, categoryState => categoryState.otherCategories);

export const allCategoriesSelector = () =>
  createSelector(categoryStateSelector, categoryState => categoryState.allCategories);

export const categoriesItemsSelector = () => {
  return createSelector(categoryStateSelector, categoryState => categoryState);
};

export const activeCategoryItemSelector = () =>
  createSelector(categoryStateSelector, categoryState => categoryState.activeCategoryItem);

export const selectedCategorySelector = () =>
  createSelector(categoryStateSelector, categoryState => categoryState.selectedCategoryName);

export const loadingSelector = () =>
  createSelector(categoryStateSelector, categoryState => categoryState.categoryLoading);

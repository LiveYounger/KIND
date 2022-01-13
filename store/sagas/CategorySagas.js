import { call, put } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';
import { setCategoryLoading } from '../actions/CategoryActions';
import { setGlobalError } from '../actions/ErrorActions';
import { categoryService } from '../../services/CategoryService';

import {
  setCategories,
  setCategoriesItems,
  appendCategoriesItems,
  setActiveCategoryItem,
  setCategoryTabs
} from '../actions/CategoryActions';

export function* categoriesGet() {
  try {
    yield put(setLoader(true));
    const { data } = yield call(categoryService.getCategories);
    yield put(setCategories(data));
  } catch (err) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* categoriesItemsGet({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    const { data } = yield call(categoryService.getCategoriesItems, payload);
    yield put(
      setCategoriesItems({
        ...data,
        isAll: payload.categories_tabs ? false : true
      })
    );
  } catch (err) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setCategoryLoading(false));
  }
}

export function* categoriesItemsLoadMore({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(categoryService.getCategoriesItemsUrl, payload);
    yield put(appendCategoriesItems(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* activeCategoryItemGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(categoryService.getCategoryItem, payload);
    yield put(setActiveCategoryItem(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* categoryTabsGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(categoryService.getCategoryCategoryTabs, payload);
    console.log(data);
    yield put(setCategoryTabs(data));
  } catch (err) {
    console.log('ERORORRORO', err);
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

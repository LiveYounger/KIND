import { call, put } from 'redux-saga/effects';
import { setLoader } from '../actions/LoaderAction';
import { setGlobalError } from '../actions/ErrorActions';
import { libraryService } from '../../services/LibraryService';

import {
  setLibraryItems,
  appendLibraryItems,
  setActiveLibraryItem,
  setLibraryTabs
} from '../actions/LibraryActions';
import { setCategoryLoading } from '../actions/CategoryActions';

export function* libraryItemsGet({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    const { data } = yield call(libraryService.getLibraryItems, payload);
    yield put(
      setLibraryItems({
        ...data,
        isAll: payload.categories_tabs ? false : true
      })
    );
  } catch (err) {
    console.log(err);
    yield put(setGlobalError(true));
  } finally {
    yield put(setCategoryLoading(false));
  }
}

export function* libraryItemsLoadMore({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(libraryService.getLibraryItemsUrl, payload);
    yield put(appendLibraryItems(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* activeLibraryItemGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(libraryService.getLibraryItem, payload);
    yield put(setActiveLibraryItem(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* libraryTabsGet({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(libraryService.getLibraryTabs, payload);
    yield put(setLibraryTabs(data));
  } catch (err) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

import { all, takeLatest } from 'redux-saga/effects';
import { INFO_GET } from '../actionTypes/InfoActionTypes';
import { SLEEPS_GET, SLEEPS_LOAD_MORE, GET_SLEEP_TABS } from '../actionTypes/SleepActionTypes';
import {
  USER_LOGIN,
  USER_SIGN_UP,
  USER_LOGOUT,
  USER_GOOGLE_LOGIN,
  USER_FACEBOOK_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_GET,
  PASSWORD_CHANGE,
  USER_UPDATE,
  USER_APPLE_LOGIN,
  GUEST_SIGN_UP
} from '../actionTypes/UserActionTypes';
import {
  userLogin,
  userSignUp,
  userLogout,
  userFacebookLogin,
  userGoogleLogin,
  userAppleLogin,
  forgotPassword,
  resetPassword,
  userGet,
  passwordChange,
  updateUser,
  guestSignup
} from '../sagas/ActiveUserSagas';
import { GET_SCENES } from '../actionTypes/ScenesActionTypes';
import { fetchScenes } from './ScenesSaga';
import { infoGet } from './InfoSagas';
import { sleepsGet, sleepsLoadMore, sleepTabsGet } from './SleepSagas';
import {
  ACTIVE_MEDITATION_GET,
  MEDITATIONS_GET,
  MEDITATIONS_LOAD_MORE,
  GET_MEDITATION_TABS
} from '../actionTypes/MeditationActionTypes';
import {
  activeMeditationGet,
  meditationsGet,
  meditationsLoadMore,
  meditationTabsGet
} from './MeditationSagas';
import { GET_ACTIVITIES, GET_LAST_FINISHED } from '../actionTypes/ActivityActionTypes';
import { activitiesGet, lastFinishedGet } from './ActivitySagas';
import {
  INIT_PURCHASES,
  REQUEST_SUBSCRIPTION,
  RESTORE_PURCHASES
} from '../actionTypes/PurchaseActionTypes';
import { purchasesInit, purchasesRestore, subscriptionRequest } from './PurchaseSagas';
import { GET_SECTIONS } from '../actionTypes/SectionActionTypes';
import { fetchSections } from './SectionsSaga';
import {
  CATEGORIES_GET,
  CATEGORIES_ITEMS_GET,
  CATEGORIES_ITEMS_LOAD_MORE,
  ACTIVE_CATEGORY_ITEM_GET,
  GET_CATEGORY_TABS
} from '../actionTypes/CategoryActionTypes';
import {
  categoriesGet,
  categoriesItemsGet,
  categoriesItemsLoadMore,
  activeCategoryItemGet,
  categoryTabsGet
} from './CategorySagas';
import {
  LIBRARY_ITEMS_GET,
  LIBRARY_ITEMS_LOAD_MORE,
  ACTIVE_LIBRARY_ITEM_GET,
  GET_LIBRARY_TABS
} from '../actionTypes/LibraryActionTypes';
import {
  libraryItemsGet,
  libraryItemsLoadMore,
  activeLibraryItemGet,
  libraryTabsGet
} from './LibrarySagas';
import { ALARM_SONGS_GET } from '../actionTypes/AlarmSongActionTypes';
import { alarmSongsGet } from './AlarmSongSaga';
import { SHOP_ITEMS_GET, SHOP_ITEMS_LOAD_MORE } from '../actionTypes/ShopActionTypes';
import { shopItemsGet, shopItemsLoadMore } from './ShopSaga';

export default function* rootSaga() {
  yield all([
    takeLatest(USER_LOGIN, userLogin),
    takeLatest(USER_SIGN_UP, userSignUp),
    takeLatest(USER_LOGOUT, userLogout),
    takeLatest(USER_FACEBOOK_LOGIN, userFacebookLogin),
    takeLatest(USER_GOOGLE_LOGIN, userGoogleLogin),
    takeLatest(USER_APPLE_LOGIN, userAppleLogin),
    takeLatest(FORGOT_PASSWORD, forgotPassword),
    takeLatest(RESET_PASSWORD, resetPassword),
    takeLatest(USER_GET, userGet),
    takeLatest(PASSWORD_CHANGE, passwordChange),
    takeLatest(USER_UPDATE, updateUser),
    takeLatest(GET_SCENES, fetchScenes),
    takeLatest(SLEEPS_GET, sleepsGet),
    takeLatest(GET_SLEEP_TABS, sleepTabsGet),
    takeLatest(SLEEPS_LOAD_MORE, sleepsLoadMore),
    takeLatest(INFO_GET, infoGet),
    takeLatest(MEDITATIONS_GET, meditationsGet),
    takeLatest(MEDITATIONS_LOAD_MORE, meditationsLoadMore),
    takeLatest(ACTIVE_MEDITATION_GET, activeMeditationGet),
    takeLatest(GET_MEDITATION_TABS, meditationTabsGet),
    takeLatest(GET_ACTIVITIES, activitiesGet),
    takeLatest(INIT_PURCHASES, purchasesInit),
    takeLatest(REQUEST_SUBSCRIPTION, subscriptionRequest),
    takeLatest(GET_SECTIONS, fetchSections),
    takeLatest(GET_LAST_FINISHED, lastFinishedGet),
    takeLatest(GUEST_SIGN_UP, guestSignup),
    takeLatest(RESTORE_PURCHASES, purchasesRestore),
    takeLatest(CATEGORIES_GET, categoriesGet),
    takeLatest(CATEGORIES_ITEMS_GET, categoriesItemsGet),
    takeLatest(CATEGORIES_ITEMS_LOAD_MORE, categoriesItemsLoadMore),
    takeLatest(ACTIVE_CATEGORY_ITEM_GET, activeCategoryItemGet),
    takeLatest(LIBRARY_ITEMS_GET, libraryItemsGet),
    takeLatest(LIBRARY_ITEMS_LOAD_MORE, libraryItemsLoadMore),
    takeLatest(GET_LIBRARY_TABS, libraryTabsGet),
    takeLatest(ACTIVE_LIBRARY_ITEM_GET, activeLibraryItemGet),
    takeLatest(ALARM_SONGS_GET, alarmSongsGet),
    takeLatest(SHOP_ITEMS_GET, shopItemsGet),
    takeLatest(SHOP_ITEMS_LOAD_MORE, shopItemsLoadMore),
    takeLatest(GET_CATEGORY_TABS, categoryTabsGet)
  ]);
}

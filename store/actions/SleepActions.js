import {
  SLEEPS_GET,
  SLEEPS_SET,
  SLEEPS_APPEND,
  SLEEPS_LOAD_MORE,
  ACTIVE_SLEEP_SET,
  ACTIVE_SLEEP_GET,
  GET_SLEEP_TABS,
  SET_SLEEP_TABS
} from '../actionTypes/SleepActionTypes';

export const getSleeps = filters => ({
  type: SLEEPS_GET,
  payload: filters
});

export const setSleeps = payload => ({
  type: SLEEPS_SET,
  payload
});

export const appendSleeps = payload => ({
  type: SLEEPS_APPEND,
  payload
});

export const loadMoreSleeps = url => ({
  type: SLEEPS_LOAD_MORE,
  payload: url
});

export const setActiveSleep = payload => ({
  type: ACTIVE_SLEEP_SET,
  payload
});

export const getActiveSleep = id => ({
  type: ACTIVE_SLEEP_GET,
  payload: id
});

export const getSleepTabs = id => ({
  type: GET_SLEEP_TABS,
  payload: id
});

export const setSleepTabs = payload => ({
  type: SET_SLEEP_TABS,
  payload
});

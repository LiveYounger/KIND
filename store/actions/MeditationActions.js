import {
  MEDITATIONS_GET,
  MEDITATIONS_SET,
  MEDITATIONS_APPEND,
  MEDITATIONS_LOAD_MORE,
  ACTIVE_MEDITATION_SET,
  ACTIVE_MEDITATION_GET,
  GET_MEDITATION_TABS,
  SET_MEDITATION_TABS
} from '../actionTypes/MeditationActionTypes';

export const getMeditations = filters => ({
  type: MEDITATIONS_GET,
  payload: filters
});

export const setMeditations = payload => ({
  type: MEDITATIONS_SET,
  payload
});

export const appendMeditations = payload => ({
  type: MEDITATIONS_APPEND,
  payload
});

export const loadMoreMeditations = url => ({
  type: MEDITATIONS_LOAD_MORE,
  payload: url
});

export const setActiveMeditation = payload => ({
  type: ACTIVE_MEDITATION_SET,
  payload
});

export const getActiveMeditation = id => ({
  type: ACTIVE_MEDITATION_GET,
  payload: id
});

export const getMeditationTabs = id => ({
  type: GET_MEDITATION_TABS,
  payload: id
});

export const setMeditationTabs = payload => ({
  type: SET_MEDITATION_TABS,
  payload
});

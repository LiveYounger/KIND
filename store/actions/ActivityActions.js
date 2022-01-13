import {
  GET_ACTIVITIES,
  GET_LAST_FINISHED,
  SET_ACTIVITIES,
  SET_LAST_FINISHED
} from '../actionTypes/ActivityActionTypes';

export const getActivities = (activityType, filters) => ({
  type: GET_ACTIVITIES,
  payload: filters
});

export const setActivities = payload => ({
  type: SET_ACTIVITIES,
  payload
});

export const getLastFinished = () => ({
  type: GET_LAST_FINISHED
});

export const setLastFinished = payload => ({
  type: SET_LAST_FINISHED,
  payload
});

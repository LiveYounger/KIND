import { INFO_SET, INFO_GET } from '../actionTypes/InfoActionTypes';

export const getInfo = key => ({
  type: INFO_GET,
  payload: key
});

export const setInfo = payload => ({
  type: INFO_SET,
  payload
});

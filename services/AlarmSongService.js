import ApiService from './ApiService';

const ENDPOINTS = {
  ALARM_SONGS: 'alarm_songs/'
};

class AlarmSongService extends ApiService {
  getAlarSongs = (filters = {}) =>
    this.apiClient.get(ENDPOINTS.ALARM_SONGS, {
      params: {
        ...filters
      }
    });
}

export const alarmSongService = new AlarmSongService();

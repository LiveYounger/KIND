import ApiService from './ApiService';

export const ENDPOINTS = {
  ALL_SOUND: 'activity/sound/',
  START_SOUND: 'activity/start-sound/',
  FINISH_SOUND: 'activity/finish-sound/',
  INTERRUPT_SOUND: 'activity/interrupt-sound/'
};

class ActivityService extends ApiService {
  startSound = data => this.apiClient.post(ENDPOINTS.START_SOUND, data);

  onFinishSound = () => {};

  finishSound = async data => {
    await this.apiClient.post(ENDPOINTS.FINISH_SOUND, data);
    this.onFinishSound();
  };

  interruptSound = data => this.apiClient.post(ENDPOINTS.INTERRUPT_SOUND, data);

  getActivities = (activityType, filters = {}) =>
    this.apiClient.get(activityType, { params: { ...filters } });

  getLatestActivity = async activityType => {
    const { data } = await this.getActivities(activityType);
    return data.count && data.results[0];
  };

  getLatestActivityForItem = async (activityType, itemId) => {
    const { data } = await this.getActivities(activityType, {
      sound__item: itemId
    });
    return data.count && data.results[0];
  };

  getLatestActivityForSound = async (activityType, soundId) => {
    const { data } = await this.getActivities(activityType, {
      sound__id: soundId
    });
    return data.count && data.results[0];
  };

  getNonTypeActivityForSound = async soundId => {
    const { data } = await this.getActivities(ENDPOINTS.ALL_SOUND, {
      sound__id: soundId
    });

    return data.count && data.results[0];
  };
}

export const activityService = new ActivityService();

export const ACTIVITY_TYPES = ENDPOINTS;

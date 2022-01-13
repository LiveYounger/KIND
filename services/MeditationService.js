import ApiService from './ApiService';

const ENDPOINTS = {
  MEDITATIONS: 'categories_items/',
  ACTIVE_MEDITATION: 'categories_items/:id/',
  MEDITATION_TABS: 'categories_tabs_all?category_id=:id'
};

class MeditationService extends ApiService {
  getMeditations = (filters = {}) =>
    this.apiClient.get(ENDPOINTS.MEDITATIONS, {
      params: {
        ...filters
      }
    });

  getMeditationsUrl = url => this.apiClient.get(url);
  getMeditation = id => this.apiClient.get(ENDPOINTS.ACTIVE_MEDITATION.replace(':id', id));
  getMeditationTabs = id => {
    console.log(ENDPOINTS.MEDITATION_TABS.replace(':id', id));
    return this.apiClient.get(ENDPOINTS.MEDITATION_TABS.replace(':id', id));
  };
}

export const meditationService = new MeditationService();

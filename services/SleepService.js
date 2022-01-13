import ApiService from './ApiService';

const ENDPOINTS = {
  SLEEPS: 'categories_items/',
  ACTIVE_SLEEP: 'categories_items/:id/',
  SLEEP_TABS: 'categories_tabs_all?category_id=:id'
};

class SleepService extends ApiService {
  getSleeps = (filters = {}) =>
    this.apiClient.get(ENDPOINTS.SLEEPS, {
      params: {
        ...filters
      }
    });

  getSleepsUrl = url => this.apiClient.get(url);

  getSleep = id => this.apiClient.get(ENDPOINTS.ACTIVE_SLEEP.replace(':id', id));

  getSleepTabs = id => {
    return this.apiClient.get(ENDPOINTS.SLEEP_TABS.replace(':id', id));
  };
}

export const sleepService = new SleepService();

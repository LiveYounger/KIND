import ApiService from './ApiService';

const ENDPOINTS = {
  ITEMS: '/items/'
};

class ItemService extends ApiService {
  getItem = id => this.apiClient.get(ENDPOINTS.ITEMS + `${id}/`);
}

export const itemService = new ItemService();

import ApiService from './ApiService';

const ENDPOINTS = {
  SHOP_ITEMS: 'shop_items/'
};

class ShopService extends ApiService {
  getShopItems = (filters = {}) =>
    this.apiClient.get(ENDPOINTS.SHOP_ITEMS, {
      params: {
        ...filters
      }
    });
  getShopItemsUrl = url => this.apiClient.get(url);
}

export const shopService = new ShopService();

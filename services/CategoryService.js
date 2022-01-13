import ApiService from './ApiService';

const ENDPOINTS = {
  CATEGORIES: 'categories/',
  CATEGORIES_ITEMS: 'categories_items/',
  CATEGORIES_TABS: 'categories_tabs/',
  ACTIVE_CATEGORY_ITEM: 'categories_items/:id/',
  CATEGORIES_TABS_ALL: 'categories_tabs_all?category_id=:id'
};

class CategoryService extends ApiService {
  getCategories = () => this.apiClient.get(ENDPOINTS.CATEGORIES);
  getCategoriesItems = (filters = {}) =>
    this.apiClient.get(ENDPOINTS.CATEGORIES_ITEMS, {
      params: {
        ...filters
      }
    });
  getCategoriesItemsUrl = url => this.apiClient.get(url);
  getCategoryItem = id => this.apiClient.get(ENDPOINTS.ACTIVE_CATEGORY_ITEM.replace(':id', id));

  getCategoryCategoryTabs = id =>
    this.apiClient.get(ENDPOINTS.CATEGORIES_TABS_ALL.replace(':id', id));
}

export const categoryService = new CategoryService();

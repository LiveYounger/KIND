import ApiService from './ApiService';

const ENDPOINTS = {
  LIBRARY_ITEMS: 'categories_items/',
  ACTIVE_LIBRARY_ITEM: 'categories_items/:id/',
  LIBRARY_TABS: 'categories_tabs_all?category_id=:id'
};

class LibraryService extends ApiService {
  getLibraryItems = (filters = {}) =>
    this.apiClient.get(ENDPOINTS.LIBRARY_ITEMS, {
      params: {
        ...filters
      }
    });
  getLibraryItemsUrl = url => this.apiClient.get(url);
  getLibraryItem = id => this.apiClient.get(ENDPOINTS.ACTIVE_LIBRARY_ITEM.replace(':id', id));
  getLibraryTabs = id => {
    return this.apiClient.get(ENDPOINTS.LIBRARY_TABS.replace(':id', id));
  };
}

export const libraryService = new LibraryService();

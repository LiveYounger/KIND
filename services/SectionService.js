import ApiService from './ApiService';

const ENDPOINTS = {
  SECTIONS: '/sections/'
};

class SectionService extends ApiService {
  getSections = () => this.apiClient.get(ENDPOINTS.SECTIONS);
}

export const sectionService = new SectionService();

import ApiService from './ApiService';

const ENDPOINTS = {
  INFO: 'info/:id/'
};

class InfoService extends ApiService {
  getInfo = id => this.apiClient.get(ENDPOINTS.INFO.replace(':id', id));
}

export const infoService = new InfoService();

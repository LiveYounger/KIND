import ApiService from './ApiService';
import authService from './AuthService';

const ENDPOINTS = {
  PROFILE: 'users/me/',
  CHANGE_PASSWORD: '/users/change-password/',
  USER: '/users/:userId/'
};

class ProfileService extends ApiService {
  getProfile = async () => {
    const user = await this.apiClient.get(ENDPOINTS.PROFILE);
    await authService.updateUserInStorage(user.data);

    return user;
  };

  changePassword = data => this.apiClient.post(ENDPOINTS.CHANGE_PASSWORD, data);

  updateUser = data => {
    let formData = new FormData();
    if (data.avatar) {
      const uri = data.avatar.uri;
      const name = uri.split('/').pop();
      const type = 'image/jpeg';
      formData.append('avatar', { uri, name, type });
    }

    formData.append('first_name', data.first_name);
    formData.append('username', data.email);
    return this.apiClient.put(ENDPOINTS.USER.replace(':userId', data.id), formData);
  };
}

export const profileService = new ProfileService();

import authService from '../services/AuthService';

export const isPremiumUser = async () => {
  const user = await authService.getUser();

  return user.is_premium;
};

import { Linking } from 'react-native';
import NavigationService from './NavigationService';

class DeepLinkingService {
  init = () => {
    //If app is in background
    Linking.addEventListener('url', event => {
      const queryParams = this.parse(event.url);
      this.processUrlEvent(queryParams);
    });
    //If app is not open
    Linking.getInitialURL().then(url => {
      if (url) {
        const queryParams = this.parse(url);

        this.processUrlEvent(queryParams);
      }
    });
  };
  parse = url => {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  };
  processUrlEvent = async queryParams => {
    if (queryParams.forgot_password_token) {
      NavigationService.navigate('ResetPassword', {
        forgot_password_token: queryParams.forgot_password_token
      });
      return;
    }
  };
}
export const deepLinkService = new DeepLinkingService();

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as Google from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import ApiService from './ApiService';
import config from '../config';
// import { askForNotificationsPermission } from '../services/PermissionsService';
// import notificationService from './NotificationService';
import { OS_TYPES } from '../constants';
import sceneService from './SceneService';
import audioPlayerService from './AudioPlayerService';
import { profileService } from './ProfileService';

const { ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } = config;

const { CLIENT_ID } = config;

const ENDPOINTS = {
  LOGIN: '/login/',
  SIGN_UP: '/users/',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/password_reset/',
  RESET_PASSWORD: '/password_reset/confirm/',
  GOOGLE: '/social/google-oauth2/',
  FACEBOOK: '/social/facebook/',
  APPLE: '/social/apple-id/',
  GUEST: '/users/guest/'
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      await this.setAuthorizationHeader();
      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
    try {
      Facebook.initializeAsync(FACEBOOK_APP_ID);
    } catch (e) {
      console.log(e); //eslint-disable-line
    }
  };

  setAuthorizationHeader = async () => {
    const token = await this.getToken();
    if (token) {
      console.log('token', token);
      this.api.attachHeaders({
        Authorization: `Token ${token}`
      });
    }

    this.api.attachHeaders({
      clientId: CLIENT_ID
    });
  };

  createSession = async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await this.setAuthorizationHeader();
    // const expoPushToken = await askForNotificationsPermission();
    // if (expoPushToken) {
    //   await AsyncStorage.setItem('expoPushToken', expoPushToken);
    //   // TODO this token need to be saved on BE
    //   // notificationService.sendExpoTokenToServer(expoPushToken);
    // }
  };

  destroySession = async () => {
    await AsyncStorage.clear();
    this.api.removeHeaders(['Authorization']);
  };

  login = async formData => {
    const loginData = { ...formData };
    loginData.username = formData.username ? formData.username : formData.email;
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData);
    await this.createSession(data);
    return data;
  };

  googleLogin = async loginPromise => {
    const result = await loginPromise;
    if (result.type !== 'success') {
      throw new Error(result.type);
    }
    const { auth } = await Google.signInSilentlyAsync();
    const { data } = await this.apiClient.post(ENDPOINTS.GOOGLE, {
      access_token: auth.accessToken || auth.serverAuthCode
    });
    await this.createSession(data);

    return data;
  };

  loginWithGoogle = async () => {
    await Google.initAsync({
      clientId: Platform.OS == OS_TYPES.IOS ? IOS_GOOGLE_CLIENT_ID : ANDROID_GOOGLE_CLIENT_ID
    });
    await Google.askForPlayServicesAsync();

    return await this.googleLogin(Google.signInAsync());
  };

  facebookLogin = async loginPromise => {
    const result = await loginPromise;

    if (result.type !== 'success') {
      throw new Error(result.type);
    }
    const { data } = await this.apiClient.post(ENDPOINTS.FACEBOOK, {
      access_token: result.token
    });
    await this.createSession(data);

    return data;
  };

  loginWithFacebook = async () => {
    return await this.facebookLogin(
      Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email']
      })
    );
  };

  loginWithApple = async () => {
    const result = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL
      ]
    });

    const { data } = await this.apiClient.post(ENDPOINTS.APPLE, {
      access_token: result.identityToken
    });
    await this.createSession(data);

    if (result.fullName && result.fullName.givenName) {
      const user = await profileService.getProfile();
      user.data.first_name = result.fullName.givenName;
      user.data.email = user.data.username;
      await profileService.updateUser(user.data);
    }

    return data;
  };

  logout = async () => {
    await this.destroySession();

    try {
      await audioPlayerService.stop();
      await sceneService.stopScene();
    } catch (e) {
      console.log(e);
    }

    return { ok: true };
  };

  forgotPassword = data => this.apiClient.post(ENDPOINTS.FORGOT_PASSWORD, data);

  resetPassword = data => this.apiClient.post(ENDPOINTS.RESET_PASSWORD, data);

  signup = async signupData => {
    await this.apiClient.post(ENDPOINTS.SIGN_UP, {
      ...signupData,
      username: signupData.email
    });

    return this.login(signupData);
  };

  guestSignup = async () => {
    const response = await this.apiClient.post(ENDPOINTS.GUEST);

    return this.login(response.data);
  };

  getToken = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user).token : undefined;
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  };

  updateUserInStorage = async property => {
    const user = await AsyncStorage.getItem('user');
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    AsyncStorage.setItem('user', JSON.stringify(jsonUser));
  };
}

const authService = new AuthService();

export default authService;

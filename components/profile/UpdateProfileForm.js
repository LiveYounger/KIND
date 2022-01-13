import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { updateProfileValidationRules } from '../../validation/profile';
import $t from 'react-native-i18n';
import ProfileInlineEditable from './ProfileInlineEditable';
import { TERMS_AND_CONDITIONS, PRIVACY_POLICY } from '../../constants/Links';
import IconChevron from '../../assets/icons/chevron.svg';
import { iconBase, iconSm } from '../../styles/icons';
import variables from '../../styles/variables';
import { uRotate180, uTextError, uTextWhite } from '../../styles/utilities';
import { listItemBtn } from '../../styles/buttons';
import { logout } from '../../store/actions/UserActions';
import { setCurrentAudio } from '../../store/actions/AudioPlayerAction';

export const UpdateProfileForm = ({ user, onSubmit, navigation }) => {
  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(setCurrentAudio(null));
    dispatch(logout());
    return navigation.navigate('AuthStack');
  };

  return (
    <Formik
      initialValues={{
        first_name: user.first_name,
        email: user.username
      }}
      onSubmit={onSubmit}
      validationSchema={updateProfileValidationRules}
      enableReinitialize={true}
    >
      {({ handleSubmit }) => (
        <>
          <Field
            name="first_name"
            placeholder={$t('profile.updateUser.firstName')}
            component={ProfileInlineEditable}
            caption={$t('profile.updateUser.firstName')}
            handleSubmit={handleSubmit}
          />

          <Field
            name="email"
            placeholder={$t('profile.updateUser.email')}
            component={ProfileInlineEditable}
            caption={$t('profile.updateUser.email')}
            handleSubmit={handleSubmit}
          />

          <TouchableOpacity
            style={listItemBtn}
            onPress={() => {
              if (navigation.state.routeName === 'EditProfileMore') {
                navigation.navigate('');
              }
              navigation.navigate('ChangePassword');
            }}
          >
            <Text style={uTextWhite}>{$t('profile.updateUser.resetPassword')}</Text>
            <IconChevron style={[iconBase, iconSm, uRotate180]} fill={variables.colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={listItemBtn}
            onPress={() => Linking.openURL(TERMS_AND_CONDITIONS)}
          >
            <Text style={uTextWhite}>{$t('profile.updateUser.termsAndConditions')}</Text>
            <IconChevron style={[iconBase, iconSm, uRotate180]} fill={variables.colors.white} />
          </TouchableOpacity>

          <TouchableOpacity style={listItemBtn} onPress={() => Linking.openURL(PRIVACY_POLICY)}>
            <Text style={uTextWhite}>{$t('profile.updateUser.privacyPolicy')}</Text>
            <IconChevron style={[iconBase, iconSm, uRotate180]} fill={variables.colors.white} />
          </TouchableOpacity>

          <TouchableOpacity style={listItemBtn} onPress={userLogout}>
            <Text style={uTextError}>{$t('auth.logout')}</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

UpdateProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object,
  navigation: PropTypes.object
};

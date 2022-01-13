import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { updateUser } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import { UpdateProfileForm } from '../../../components/profile/UpdateProfileForm';
import { screenBlack, screenContent, screenWrap } from '../../../styles/screens';
import { uPadBottomXxl, uPadTopXl } from '../../../styles/utilities';

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleUserUpdate = data => dispatch(updateUser(data));
  const user = useSelector(userSelector());

  const handleSubmit = updateUserData => {
    handleUserUpdate({ ...updateUserData, id: user.id });
  };

  return (
    <View style={[screenWrap, screenBlack]}>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={[screenContent, uPadTopXl, uPadBottomXxl]}
      >
        <UpdateProfileForm onSubmit={handleSubmit} user={user} navigation={navigation} />
      </KeyboardAwareScrollView>
    </View>
  );
};

EditProfile.propTypes = {
  navigation: PropTypes.object
};

export default EditProfile;

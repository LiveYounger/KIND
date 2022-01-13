import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import variables from '../../styles/variables';
import { uPadXs } from '../../styles/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { guestSignup } from '../../store/actions/UserActions';
import { userSelector } from '../../store/selectors/UserSelector';
import sceneService from '../../services/SceneService';

const GuestUserButton = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector());

  const handlePress = () => {
    if (user?.is_guest) {
      sceneService.playScene();
      navigation.navigate('MainStack');
    } else dispatch(guestSignup());
  };

  return (
    <TouchableOpacity style={uPadXs} onPress={handlePress}>
      <AntDesign name="close" size={26} color={variables.colors.white} />
    </TouchableOpacity>
  );
};

GuestUserButton.propTypes = {
  navigation: PropTypes.object
};

export default GuestUserButton;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveMeditation } from '../../store/actions/MeditationActions';
import { activeMeditationSelector } from '../../store/selectors/MeditationSelector';
import PropTypes from 'prop-types';
import Details from '../../components/shared/details/Details';

const ActiveMeditationScreen = ({ navigation }) => {
  const meditationId = navigation.getParam('meditationId');

  const activeMeditation = useSelector(activeMeditationSelector());

  const dispatch = useDispatch();

  useEffect(() => {
    if (meditationId) dispatch(getActiveMeditation(meditationId));
  }, []);

  return <Details item={activeMeditation} navigation={navigation} />;
};

ActiveMeditationScreen.propTypes = {
  navigation: PropTypes.object
};

export default ActiveMeditationScreen;

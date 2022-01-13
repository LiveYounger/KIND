import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveSleep } from '../../store/actions/SleepActions';
import { activeSleepSelector } from '../../store/selectors/SleepSelector';
import PropTypes from 'prop-types';
import Details from '../../components/shared/details/Details';

const ActiveSleepScreen = ({ navigation }) => {
  const sleepId = navigation.getParam('sleepId');

  const activeSleep = useSelector(activeSleepSelector());

  const dispatch = useDispatch();

  useEffect(() => {
    if (sleepId) dispatch(getActiveSleep(sleepId));
  }, []);

  return <Details item={activeSleep} navigation={navigation} />;
};

ActiveSleepScreen.propTypes = {
  navigation: PropTypes.object
};

export default ActiveSleepScreen;

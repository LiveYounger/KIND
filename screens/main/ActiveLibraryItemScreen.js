import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveLibraryItem } from '../../store/actions/LibraryActions';
import { activeLibraryItemSelector } from '../../store/selectors/LibrarySelector';
import PropTypes from 'prop-types';
import Details from '../../components/shared/details/Details';

const ActiveLibraryItemScreen = ({ navigation }) => {
  const libraryItemId = navigation.getParam('libraryItemId');

  const activeLibraryItem = useSelector(activeLibraryItemSelector());

  const dispatch = useDispatch();

  useEffect(() => {
    if (libraryItemId) dispatch(getActiveLibraryItem(libraryItemId));
  }, []);

  return <Details item={activeLibraryItem} navigation={navigation} />;
};

ActiveLibraryItemScreen.propTypes = {
  navigation: PropTypes.object
};

export default ActiveLibraryItemScreen;

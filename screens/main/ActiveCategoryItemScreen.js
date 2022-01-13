import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveCategoryItem } from '../../store/actions/CategoryActions';
import { activeCategoryItemSelector } from '../../store/selectors/CategorySelector';
import PropTypes from 'prop-types';
import Details from '../../components/shared/details/Details';

const ActiveCategoryItemScreen = ({ navigation }) => {
  const categoryItemId = navigation.getParam('categoryItemId');

  const activeCategoryItem = useSelector(activeCategoryItemSelector());

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryItemId) dispatch(getActiveCategoryItem(categoryItemId));
  }, []);

  return <Details item={activeCategoryItem} navigation={navigation} />;
};

ActiveCategoryItemScreen.propTypes = {
  navigation: PropTypes.object
};

export default ActiveCategoryItemScreen;

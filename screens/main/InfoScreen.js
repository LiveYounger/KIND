import React, { useEffect } from 'react';
import { Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo, setInfo } from '../../store/actions/InfoActions';
import { infoSelector } from '../../store/selectors/InfoSelector';
import FullScreenModal from '../../components/shared/modal/FullScreenModal';
import PropTypes from 'prop-types';
import { uFlexGrow, uPad, uTextCenter, uTextWhite } from '../../styles/utilities';
import { ScrollView } from 'react-native';
import { modalCoverImage, modalStaticSubTitle, modalStaticTitle } from '../../styles/modals';

const InfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const infoId = navigation.getParam('infoId');

  useEffect(() => {
    dispatch(setInfo({}));
    dispatch(getInfo(infoId));
  }, []);

  const info = useSelector(infoSelector());

  return (
    <FullScreenModal navigation={navigation}>
      <Image style={modalCoverImage} source={{ uri: info.image && info.image.large_square }} />

      <ScrollView style={[uPad, uFlexGrow]}>
        <Text style={modalStaticTitle}>{info.title}</Text>
        <Text style={modalStaticSubTitle}>{info.subtitle}</Text>
        <Text style={[uTextWhite, uTextCenter]}>{info.text}</Text>
      </ScrollView>
    </FullScreenModal>
  );
};

InfoScreen.propTypes = {
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  navigation: PropTypes.object
};

export default InfoScreen;

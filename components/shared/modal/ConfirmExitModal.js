import React from 'react';
import { TouchableOpacity, Text, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import $t from 'react-native-i18n';
import { Modal, ModalBody, ModalFooter, ModalHeader } from './baseModal';
import { btnBase, btnTransparent, iconBtnTextLabelWhite } from '../../../styles/buttons';
import {
  uFlexJustifyCenter,
  uGapBottomSm,
  uTextCenter,
  uTextWhite
} from '../../../styles/utilities';
import { modalTitle } from '../../../styles/modals';
import audioPlayerService from '../../../services/AudioPlayerService';
import { useDispatch } from 'react-redux';
import { setCurrentAudio } from '../../../store/actions/AudioPlayerAction';

const ConfirmExitModal = ({ isVisible, closeModal }) => {
  const dispatch = useDispatch();

  const exitApp = () => {
    audioPlayerService.stop();
    dispatch(setCurrentAudio(null));
    BackHandler.exitApp();
  };

  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalHeader>
        <Text style={[modalTitle, uTextWhite]}>{$t('confirmExit.exitApp')}</Text>
      </ModalHeader>

      <ModalBody>
        <Text style={uTextWhite}>{$t('confirmExit.areYouSure')}</Text>
      </ModalBody>

      <ModalFooter>
        <TouchableOpacity style={btnBase} onPress={exitApp}>
          <Text style={iconBtnTextLabelWhite}>{$t('confirmExit.yes')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[btnBase, btnTransparent, uFlexJustifyCenter, uGapBottomSm]}
          onPress={closeModal}>
          <Text style={[uTextWhite, uTextCenter]}>{$t('confirmExit.no')}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmExitModal;

ConfirmExitModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  exitApp: PropTypes.func
};

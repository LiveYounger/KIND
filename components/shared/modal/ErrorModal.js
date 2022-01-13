import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import RNRestart from 'react-native-restart';
import $t from 'react-native-i18n';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './baseModal';
import { btnBase, btnTransparent, iconBtnTextLabelWhite } from '../../../styles/buttons';
import {
  uFlexJustifyCenter,
  uGapBottomSm,
  uTextCenter,
  uTextWhite
} from '../../../styles/utilities';
import { modalTitle } from '../../../styles/modals';

const ErrorModal = ({ isVisible, closeModal }) => {
  const _restartApp = () => {
    closeModal();
    RNRestart.Restart();
  };

  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalHeader>
        <Text style={[modalTitle, uTextWhite]}>{$t('error.somethingWrong')}</Text>
      </ModalHeader>

      <ModalBody>
        <Text style={uTextWhite}>{$t('error.doYouWantToRestart')}</Text>
      </ModalBody>

      <ModalFooter>
        <TouchableOpacity style={btnBase} onPress={_restartApp}>
          <Text style={iconBtnTextLabelWhite}>{$t('error.restart')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[btnBase, btnTransparent, uFlexJustifyCenter, uGapBottomSm]}
          onPress={closeModal}
        >
          <Text style={[uTextWhite, uTextCenter]}>{$t('error.cancel')}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default ErrorModal;

ErrorModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func
};

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import $t from 'react-native-i18n';

import { Modal, ModalBody, ModalFooter } from './baseModal';
import { uTextWhite } from '../../../styles/utilities';
import { btnBase, iconBtnTextLabelWhite } from '../../../styles/buttons';

const PasswordChangedModal = ({ isVisible, closeModal }) => {
  return (
    <Modal isVisible={isVisible} closeModal={closeModal}>
      <ModalBody>
        <Text style={uTextWhite}>{$t('profile.changePassword.passwordChangedSuccess')}</Text>
      </ModalBody>
      <ModalFooter>
        <TouchableOpacity style={btnBase} onPress={closeModal}>
          <Text style={iconBtnTextLabelWhite}>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </ModalFooter>
    </Modal>
  );
};

export default PasswordChangedModal;

PasswordChangedModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func
};

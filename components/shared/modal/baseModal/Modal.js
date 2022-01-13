import React from 'react';
import { View, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { modalOverlay, modalPopupWrap } from '../../../../styles/modals';

const ModalWrapper = ({ isVisible, closeModal, children }) => {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={closeModal} transparent>
      <View style={modalOverlay}>
        <View style={modalPopupWrap}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalWrapper;

ModalWrapper.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

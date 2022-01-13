import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import $t from 'react-native-i18n';

import HorizontalList from '../HorizontalList';
import SceneItem from './SceneItem';
import variables from '../../../styles/variables';
import IconClose from '../../../assets/icons/close.svg';
import Button from '../../shared/Button';
import { scenesSelector } from '../../../store/selectors/ScenesSelector';
import { iconBase } from '../../../styles/icons';
import { btnSm, btnTransparent } from '../../../styles/buttons';
import { appHeaderTitle } from '../../../styles/screens';
import Slider from '../Slider';
import sceneService from '../../../services/SceneService';
import IconSoundOn from '../../../assets/icons/sound-on.svg';
import IconSoundOff from '../../../assets/icons/sound-off.svg';
import {
  uFlexAlignCenter,
  uFlexJustifyBetween,
  uFlexRow,
  uGapBottom,
  uGapRight,
  uPadHorMd,
  uTextWhite
} from '../../../styles/utilities';
import Layout from '../../../constants/Layout';
import ModalDropdown from 'react-native-modal-dropdown';

const ScenesModal = ({ isVisible, closeModal, navigation }) => {
  const dispatch = useDispatch();
  const [sliderVolume, updateSliderVolume] = useState(0.5);
  const [selectedBGTime, setSelectedBGTime] = useState(null);
  const scenes = useSelector(scenesSelector());
  const slideLenght = Layout.window.width - 220;
  const dropDownModalRef = useRef();

  const options = [
    0,
    10000,
    15 * 60000,
    30 * 60000,
    45 * 60000,
    3600000,
    2 * 3600000,
    4 * 3600000,
    8 * 3600000,
    12 * 3600000
  ];
  const closeSceneModal = () => {
    closeModal();
  };

  let mappedScenes =
    scenes?.map((scene, i) => (
      <SceneItem navigation={navigation} closeSceneModal={closeSceneModal} key={i} scene={scene} />
    )) || [];

  useEffect(
    () => {
      initSceneVolume();
    },
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      let savedTime = await AsyncStorage.getItem('backgroundTimeMilis');
      // let play = await AsyncStorage.getItem('playOutside');
      // if (!play) {
      //   setIsEnabled(false);
      // } else {
      //   if (play == 'false') {
      //     setIsEnabled(false);
      //   } else {
      //     setIsEnabled(true);
      //   }
      // }
      if (!savedTime) {
        setSelectedBGTime(milisConversion(10000));
        sceneService.setSceneBackgroundTime(10000);
      } else {
        setSelectedBGTime(milisConversion(savedTime));
      }
    })();
  }, []);

  const initSceneVolume = async () => {
    const cachedValue = JSON.parse(await AsyncStorage.getItem('sceneVolume'));

    if (cachedValue !== sliderVolume) {
      await setVolume([cachedValue]);
    }
  };

  const setVolume = async volumes => {
    if (volumes[0] === sliderVolume) {
      return true;
    }

    await sceneService.setSceneVolume(volumes[0]);
    updateSliderVolume(volumes[0]);
  };

  const setSceneBackgroundTime = async item => {
    setSelectedBGTime(milisConversion(item));
    sceneService.setSceneBackgroundTime(item);
  };

  const milisConversion = milis => {
    let seconds = milis / 1000;
    if (seconds < 60) {
      return seconds + ' sec';
    } else if (seconds < 3600) {
      return seconds / 60 + ' min';
    } else {
      return seconds / 3600 + ' hours';
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={closeSceneModal} transparent>
      <View style={styles.modalBg}>
        <View style={styles.modalHeader}>
          <Text style={appHeaderTitle}>{$t('scenes.scenes')}</Text>
          <Button onPress={closeSceneModal} style={[btnTransparent, btnSm, styles.modalClose]}>
            <IconClose style={iconBase} fill={variables.colors.white} />
          </Button>
        </View>

        <View style={styles.modalContent}>
          <View style={[uFlexRow, uFlexAlignCenter, uFlexJustifyBetween, uGapBottom, uPadHorMd]}>
            <Text style={[uTextWhite, uGapRight]}>{$t('scenes.sceneVolume')}</Text>

            <Slider
              slideLenght={slideLenght}
              initValue={sliderVolume}
              min={0}
              max={1}
              step={0.1}
              onChange={setVolume}
              LeadingIcon={IconSoundOff}
              TrailingIcon={IconSoundOn}
            />
          </View>
          <TouchableOpacity>
            <View
              style={[
                uFlexRow,
                uFlexAlignCenter,
                uFlexJustifyBetween,
                uGapBottom,
                uPadHorMd,
                styles.dropDownView
              ]}
            >
              <Text style={[uTextWhite, uGapRight]}>{$t('scenes.playOutsideOfApp')}</Text>
              <ModalDropdown
                options={options}
                ref={dropDownModalRef}
                renderSeparator={() => null}
                dropdownStyle={styles.dropdown}
                onSelect={index => setSceneBackgroundTime(options[index])}
                renderRow={item => (
                  <TouchableOpacity
                    onPress={() => {
                      setSceneBackgroundTime(item);
                      dropDownModalRef.current.hide();
                    }}
                  >
                    <View style={styles.dropdownItem}>
                      <Text>{milisConversion(item)}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              >
                <Text style={styles.selectedTimeText}>
                  {selectedBGTime ? selectedBGTime : '10 sec'}
                </Text>
              </ModalDropdown>
              {/* <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              /> */}
            </View>
          </TouchableOpacity>

          <View style={styles.sceneListWrap}>
            <HorizontalList list={mappedScenes} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropDownView: { paddingBottom: 20 },

  dropdown: {
    height: 400,
    marginTop: 20,
    width: 150
  },

  dropdownItem: { alignItems: 'center', padding: 15 },

  modalBg: {
    backgroundColor: variables.colors.black50,
    flexGrow: 1
  },

  modalClose: {
    bottom: variables.gutters.sm,
    position: 'absolute',
    right: 0
  },
  modalContent: {
    backgroundColor: variables.colors.black,
    paddingVertical: variables.gutters.base
  },
  modalHeader: {
    alignItems: 'center',
    backgroundColor: variables.colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: variables.gutters.sm,
    paddingTop: variables.gutters.xl,
    position: 'relative'
  },

  sceneListWrap: {
    marginRight: -variables.gutters.base
  },
  selectedTimeText: {
    color: variables.colors.white
  }
});

ScenesModal.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  navigation: PropTypes.object
};

export default ScenesModal;

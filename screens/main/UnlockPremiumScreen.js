import React, { useEffect } from 'react';
import FullScreenModal from '../../components/shared/modal/FullScreenModal';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import $t from 'react-native-i18n';
import { BlurView } from 'expo-blur';

import {
  uFlexGrow,
  uFlexRow,
  uGapBottom,
  uGapBottomSm,
  uGapBottomLg,
  uGapRight,
  uTextBlack,
  uTextCenter,
  uTextWhite,
  uFlexJustifyCenter,
  uTextBold,
  uTextBaseSize,
  uPad,
  uBorderRadius20
} from '../../styles/utilities';
import { btnBase, btnWhite, iconBtnTextLabelWhite } from '../../styles/buttons';
import { screenContent, screenTitle } from '../../styles/screens';
import IconTick from '../../assets/icons/tick.svg';
import variables from '../../styles/variables';
import { iconBase, iconLg } from '../../styles/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  initPurchases,
  requestSubscription,
  restorePurchases
} from '../../store/actions/PurchaseActions';
import * as PREMIUM from '../../constants/Premium';
import { getInfo, setInfo } from '../../store/actions/InfoActions';
import { infoSelector } from '../../store/selectors/InfoSelector';
import Layout from '../../constants/Layout';
import { getUser } from '../../store/actions/UserActions';
import { purchaseInitializedSelector } from '../../store/selectors/PurchaseSelector';
import { getSections } from '../../store/actions/SectionActions';
import { getSleeps } from '../../store/actions/SleepActions';
import { getMeditations } from '../../store/actions/MeditationActions';

const UnlockPremiumScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handlePurchaseSuccessfull = () => {
    dispatch(getUser());
    dispatch(getSections());
    dispatch(getSleeps());
    dispatch(getMeditations());
    navigation.goBack();
  };

  const isPurchaseInitialized = useSelector(purchaseInitializedSelector());

  useEffect(() => {
    dispatch(initPurchases());
    dispatch(setInfo({}));
    dispatch(getInfo('unlock-premium'));
  }, []);

  const info = useSelector(infoSelector());

  const bulletPoints = info.text ? info.text.split('\n') : [];

  const premiumItems = bulletPoints.map((item, index) => (
    <View key={index} style={[uFlexRow, uGapBottomSm]}>
      <IconTick style={[iconBase, iconLg, uGapRight]} fill={variables.colors.white} />
      <Text style={styles.premiumItemText}>{item}</Text>
    </View>
  ));

  const trialPeriodString = $t('premium.trialPeriodAndPrice')
    .replace(':duration', PREMIUM.TRIAL_DURATION)
    .replace(':price', PREMIUM.SUBSCRIPTION_PRICE)
    .replace(':period', PREMIUM.SUBSCRIPTION_PERIOD);

  return (
    <FullScreenModal navigation={navigation} closeIconColor="white">
      <ImageBackground
        style={uFlexGrow}
        source={{ uri: info.image ? info.image.large_square : '' }}
      >
        <SafeAreaView style={screenContent}>
          <View style={[uFlexGrow, uFlexJustifyCenter]}>
            <Text style={[screenTitle, uTextCenter]}>{info.title}</Text>
            {premiumItems}
          </View>

          <BlurView intensity={90} tint="dark" style={[uPad, uBorderRadius20]}>
            <Text style={[uTextWhite, uTextCenter, uGapBottomLg, uTextBaseSize, uTextBold]}>
              {trialPeriodString}
            </Text>
            <TouchableOpacity
              disabled={!isPurchaseInitialized}
              onPress={() => dispatch(requestSubscription(handlePurchaseSuccessfull))}
              style={[btnBase, btnWhite, uGapBottom]}
            >
              <Text style={[iconBtnTextLabelWhite, uTextBlack]}>{$t('premium.startTrialNow')}</Text>
            </TouchableOpacity>
            <Text style={[uTextWhite, uTextCenter, uGapBottomSm]}>
              {$t('premium.cancelAnytime')}
            </Text>
            <TouchableOpacity onPress={() => dispatch(restorePurchases(handlePurchaseSuccessfull))}>
              <Text style={[uTextWhite, uTextCenter]}>{$t('premium.alreadyPurchased')}</Text>
            </TouchableOpacity>
          </BlurView>
        </SafeAreaView>
      </ImageBackground>
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  premiumItemText: {
    ...uTextWhite,
    ...uFlexGrow,
    maxWidth: Layout.window.width - variables.gutters.md * 3 - variables.sizes.iconLg
  }
});

UnlockPremiumScreen.propTypes = {
  navigation: PropTypes.object
};

export default UnlockPremiumScreen;

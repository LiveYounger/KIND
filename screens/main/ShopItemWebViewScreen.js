import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { screenWrap, screenPadTopMore, screenContentWihoutMargin } from '../../styles/screens';
import PropTypes from 'prop-types';
import OfflineWarning from '../../components/shared/OfflineWarning';
import { uFlexRow } from '../../styles/utilities';
import variables from '../../styles/variables';
import { hasNotch } from 'react-native-device-info';
import IconClose from '../../assets/icons/close.svg';
import { iconBase, iconMd } from '../../styles/icons';

const ShopItemWebViewScreen = ({ navigation }) => {
  const uri = navigation.getParam('itemUri');
  const addStyle = hasNotch() ? screenPadTopMore : { paddingTop: 15 };

  return (
    <View style={screenWrap}>
      <OfflineWarning />
      <View style={[screenContentWihoutMargin, addStyle]}>
        <View style={[uFlexRow, styles.marginTop20, styles.marginLeft20]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <IconClose style={[iconBase, iconMd]} fill={variables.colors.white} />
          </TouchableOpacity>
        </View>
        <WebView source={{ uri: uri }} style={styles.marginTop20} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  marginLeft20: { marginLeft: 20 },
  marginTop20: { marginTop: 20 }
});

ShopItemWebViewScreen.propTypes = {
  navigation: PropTypes.object
};

export default ShopItemWebViewScreen;

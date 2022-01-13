import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import $t from 'react-native-i18n';
import useIsConnected from '../../helpers/netInfoHelper';
import { SafeAreaView } from 'react-navigation';
import { uTextWhite, uTextCenter } from '../../styles/utilities';

const OfflineWarning = () => {
  const isConnected = useIsConnected();
  const [appStarting, setAppStarting] = useState(true);

  useEffect(() => {
    setTimeout(() => setAppStarting(false), 3000);
  }, []);

  if (appStarting) return null;

  if (isConnected === undefined) return null;

  return (
    !isConnected && (
      <SafeAreaView>
        <Text style={[uTextWhite, uTextCenter]}>{$t('common.offline')}</Text>
      </SafeAreaView>
    )
  );
};

export default OfflineWarning;

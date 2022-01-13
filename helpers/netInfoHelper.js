import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';

const useIsConnected = () => {
  const [isInternetReachable, isInternetReachable_set] = React.useState(undefined);

  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      isInternetReachable_set(() => state.isInternetReachable);
    });
    const unsubscribe = NetInfo.addEventListener(state => {
      isInternetReachable_set(() => state.isInternetReachable);
    });
    return unsubscribe;
  }, []);

  return isInternetReachable;
};

export default useIsConnected;

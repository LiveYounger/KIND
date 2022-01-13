import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

const useAppState = () => {
  const [appState, setAppState] = useState('active');

  useEffect(() => {
    AppState.addEventListener('change', appStateChange);
    return () => AppState.removeEventListener('change', appStateChange);
  }, []);

  const appStateChange = appState => {
    setAppState(appState);
  };

  return appState;
};

export default useAppState;

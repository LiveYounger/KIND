import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import loaderReducer from './LoaderReducer';
import errorReducer from './ErrorReducer';
import sceneReducer from './SceneReducer';
import sleepReducer from './SleepReducer';
import infoReducer from './InfoReducer';
import meditationReducer from './MeditationReducer';
import audioPlayerReducer from './AudioPlayerReducer';
import activityReducer from './ActivityReducer';
import sectionsReducer from './SectionReducer';
import purchaseReducer from './PurchaseReducer';
import categoryReducer from './CategoryReducer';
import libraryReducer from './LibraryReducer';
import alarmSongReducer from './AlarmSongReducer';
import alarmReducer from './AlarmReducer';
import shopReducer from './ShopReducer';

export default combineReducers({
  sceneReducer,
  userReducer,
  loaderReducer,
  errorReducer,
  sleepReducer,
  meditationReducer,
  infoReducer,
  audioPlayerReducer,
  activityReducer,
  sectionsReducer,
  purchaseReducer,
  categoryReducer,
  libraryReducer,
  alarmSongReducer,
  alarmReducer,
  shopReducer
});

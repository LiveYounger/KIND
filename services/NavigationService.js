import { NavigationActions } from 'react-navigation';

let _navigator;

export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  if (_navigator && routeName) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  }
};

export const goBack = () => {
  if (_navigator) {
    _navigator.dispatch(NavigationActions.back());
  }
};

export const getCurrentRoute = (nav = _navigator?.state?.nav) => {
  if (!nav) return null;
  if (Array.isArray(nav.routes) && nav.routes.length > 0) {
    return getCurrentRoute(nav.routes[nav.index]);
  } else {
    return nav.routeName;
  }
};

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  getCurrentRoute
};

import React from 'react';
import * as Icon from '@expo/vector-icons';
import { addHours, getMinutes, getHours, getSeconds } from 'date-fns';

export const addHeaderLeftNavigator = navigation => {
  const styles = {
    menuIcon: {
      marginLeft: 10,
      marginTop: 10
    }
  };

  return {
    headerLeft: (
      <Icon.Ionicons
        name="ios-menu"
        size={24}
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={styles.menuIcon}
      />
    )
  };
};

export const getDurationString = duration_seconds => {
  const normalizeTime = time => (time.length === 1 ? `0${time}` : time);

  const SECONDS_TO_MILLISECONDS_COEFF = 1000;
  const MINUTES_IN_HOUR = 60;

  const milliseconds = duration_seconds * SECONDS_TO_MILLISECONDS_COEFF;

  const date = new Date(milliseconds);
  const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR;
  const dateWithoutTimezoneDiff = addHours(date, timezoneDiff);

  const hours = String(getHours(dateWithoutTimezoneDiff));
  const minutes = String(getMinutes(dateWithoutTimezoneDiff));
  const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)));

  const hoursOutput = hours !== '0' ? `${hours}:` : '';

  return `${hoursOutput}${minutes}:${seconds}`;
};

export function isApproximatelyEqual(value1, value2, tolerance = 5) {
  return value1 < value2 + tolerance && value1 > value2 - tolerance;
}

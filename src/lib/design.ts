import {Dimensions, Platform} from 'react-native';

export const COLORS = {
  TEXT: {
    PRIMARY: '#37506d',
    SECONDARY: '#4072b0',
    INFO: '#d9ae7d',
    SUCCESS: '#e3d5a5',
    DISABLED: '#90a5b2',
    DANGER: '#F45B69',
  },
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  LIGHTBLACK: '#252525',
  SURFACE: {
    MAIN: '#dbe2f6',
  },
  TRANSPARENT: 'transparent',
};

export const SPACING = {
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 24,
  xxlarge: 32,
  xxxlarge: 48,
};

export const BORDER_WIDTH = {
  xsmall: 0.2,
  small: 0.5,
  medium: 1,
  large: 1.5,
};

export const BORDER_RADIUS = {
  small: 1,
  medium: 5,
  large: 10,
  xlarge: 20,
  circle: 999,
};

export const BORDER_COLOR = '#b1b9c0';

export const ACTIVE_OPACITY = 0.5;

const dimensions = Dimensions.get('window');

export const SCREEN_WIDTH = dimensions.width;
export const SCREEN_HEIGHT = dimensions.height;

export const ROOT_PADDING_TOP = Platform.OS === 'ios' ? SPACING.xxlarge : 0;

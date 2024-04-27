import {StyleSheet, TextStyle} from 'react-native';

interface Style {
  default: TextStyle;

  xxlargeSize: TextStyle;
  xlargeSize: TextStyle;
  largeSize: TextStyle;
  mediumSize: TextStyle;
  smallSize: TextStyle;
}

export default StyleSheet.create<Style>({
  default: {
    fontFamily: 'Roboto-Regular',
  },

  xxlargeSize: {
    fontSize: 40,
    fontWeight: '600',
    fontFamily: 'Roboto-Bold',
  },

  xlargeSize: {
    fontSize: 30,
    fontWeight: '500',
  },

  largeSize: {
    fontSize: 24,
  },

  mediumSize: {
    fontSize: 16,
  },

  smallSize: {
    fontSize: 12,
  },
});

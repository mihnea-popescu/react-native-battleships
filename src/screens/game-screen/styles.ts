import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {COLORS, SPACING} from '../../lib/design';

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  createdContainer: ViewStyle;
  createdText: TextStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE.MAIN,
  },
  content: {
    flex: 1,
    // backgroundColor: 'red',
    paddingTop: SPACING.medium,
    justifyContent: 'center',
  },
  createdContainer: {
    alignItems: 'center',
  },
  createdText: {
    marginBottom: SPACING.small,
  },
});

import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {COLORS, SPACING} from '../../lib/design';

interface Style {
  container: ViewStyle;
  errorContainer: ViewStyle;
  errorText: TextStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  errorContainer: {
    width: '100%',
  },
  errorText: {
    width: '100%',
    marginVertical: SPACING.xsmall,
    color: COLORS.TEXT.DANGER,
  },
});

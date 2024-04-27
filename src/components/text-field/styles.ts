import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  BORDER_COLOR,
  BORDER_RADIUS,
  BORDER_WIDTH,
  COLORS,
  SPACING,
} from '../../lib/design';

interface Style {
  container: ViewStyle;
  label: TextStyle;
  textInput: ViewStyle;
}

const FIELD_HEIGHT = 100;

export default StyleSheet.create<Style>({
  container: {
    minHeight: FIELD_HEIGHT,
    width: '100%',
    paddingVertical: SPACING.small,
  },
  label: {
    marginBottom: SPACING.small,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: COLORS.TRANSPARENT,
    borderWidth: BORDER_WIDTH.xsmall,
    borderRadius: BORDER_RADIUS.medium,
    borderColor: BORDER_COLOR,
  },
});

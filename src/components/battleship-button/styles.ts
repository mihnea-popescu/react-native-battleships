import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {BORDER_RADIUS, BORDER_WIDTH, COLORS} from '../../lib/design';

interface Style {
  container: ViewStyle;
  primaryButton: ViewStyle;
  primaryButtonText: TextStyle;
}

const PRIMARY_BUTTON_HEIGHT = 50;

export default StyleSheet.create<Style>({
  container: {
    backgroundColor: 'red',
  },
  primaryButton: {
    width: '75%',
    minHeight: PRIMARY_BUTTON_HEIGHT,
    backgroundColor: COLORS.TEXT.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: BORDER_WIDTH.small,
    borderRadius: BORDER_RADIUS.xlarge,
  },
  primaryButtonText: {
    color: COLORS.WHITE,
  },
});

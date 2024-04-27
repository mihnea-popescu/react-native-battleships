import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {COLORS, SPACING} from '../../lib/design';

interface Style {
  container: ViewStyle;
  card: ViewStyle;
  title: TextStyle;
  row: ViewStyle;
  buttonRow: ViewStyle;
  footer: ViewStyle;
  footerTitle: TextStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE.MAIN,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxlarge,
  },
  title: {
    color: COLORS.TEXT.PRIMARY,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.small,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxxlarge,
    marginTop: SPACING.large,
  },
  footer: {
    marginTop: SPACING.xlarge,
  },
  footerTitle: {
    color: COLORS.TEXT.SECONDARY,
  },
});

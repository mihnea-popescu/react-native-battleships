import {StyleSheet, ViewStyle} from 'react-native';
import {
  BORDER_WIDTH,
  COLORS,
  ROOT_PADDING_TOP,
  SPACING,
} from '../../lib/design';

interface Style {
  container: ViewStyle;
  headerRow: ViewStyle;
  headerButton: ViewStyle;
  content: ViewStyle;
  row: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    paddingTop: ROOT_PADDING_TOP,
    backgroundColor: COLORS.SURFACE.MAIN,
  },
  headerRow: {
    marginTop: SPACING.medium,
    flexDirection: 'row',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    borderBottomWidth: BORDER_WIDTH.medium,
  },
  headerButton: {
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    alignItems: 'center',
    marginVertical: SPACING.medium,
  },
});

import {StyleSheet, ViewStyle} from 'react-native';
import {COLORS, ROOT_PADDING_TOP, SPACING} from '../../lib/design';

interface Style {
  container: ViewStyle;
  headerRow: ViewStyle;
  headerButton: ViewStyle;
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
  },
  headerButton: {
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'center',
  },
});

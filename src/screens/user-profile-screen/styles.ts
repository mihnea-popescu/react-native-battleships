import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {COLORS, SPACING} from '../../lib/design';

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  card: ViewStyle;
  row: ViewStyle;
  text: TextStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: COLORS.SURFACE.MAIN,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    marginVertical: SPACING.xlarge,
    paddingTop: SPACING.xlarge,
    marginHorizontal: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    backgroundColor: COLORS.WHITE,
    paddingBottom: SPACING.xlarge + SPACING.small,
  },
  row: {
    marginTop: SPACING.small,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.TEXT.PRIMARY,
  },
});

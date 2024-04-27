import {StyleSheet, ViewStyle} from 'react-native';
import {SCREEN_WIDTH, SPACING} from '../../lib/design';

interface Style {
  container: ViewStyle;
  scrollView: ViewStyle;
  content: ViewStyle;
  card: ViewStyle;
  row: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    width: SCREEN_WIDTH - 2 * SPACING.large,
    paddingHorizontal: SPACING.medium,
    marginHorizontal: SPACING.large,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SPACING.xlarge,
  },
});

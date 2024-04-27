import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {BORDER_WIDTH, SPACING} from '../../lib/design';

interface Style {
  header: ViewStyle;
  headerIconContainer: ViewStyle;
  headerTitle: TextStyle;
}

export const HEADER_WITH_TITLE_HEIGHT = 100;

export default StyleSheet.create<Style>({
  header: {
    height: HEADER_WITH_TITLE_HEIGHT,
    width: '100%',
    borderBottomWidth: BORDER_WIDTH.small,
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: SPACING.medium,
    justifyContent: 'center',
    paddingBottom: SPACING.small,
    zIndex: 99,
  },
  headerIconContainer: {
    position: 'absolute',
    left: 0,
    bottom: SPACING.small,
  },
  headerTitle: {
    textAlign: 'center',
  },
});

import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {BORDER_WIDTH, COLORS, SPACING} from '../../lib/design';

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  headerRow: ViewStyle;
  gameContainer: ViewStyle;
  gameTitleContainer: ViewStyle;
  gameTitle: TextStyle;
  gameDetails: TextStyle;
  scrollFooter: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    // backgroundColor: COLORS.SURFACE.MAIN,
  },
  content: {
    flex: 1,
    paddingVertical: SPACING.medium,
  },
  headerRow: {
    flexDirection: 'row',
    height: 20,
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.xxlarge,
    justifyContent: 'center',
  },
  gameContainer: {
    flex: 1,
    borderWidth: BORDER_WIDTH.small,
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.small,
  },
  gameTitleContainer: {},
  gameTitle: {
    color: COLORS.BLACK,
  },
  gameDetails: {
    color: COLORS.TEXT.PRIMARY,
  },
  scrollFooter: {
    paddingBottom: SPACING.xxxlarge,
  },
});

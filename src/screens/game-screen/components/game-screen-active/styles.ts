import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {BORDER_WIDTH, COLORS, SPACING} from '../../../../lib/design';
import {GAME_PLOT_SIZE} from '../../utils';

interface Style {
  container: ViewStyle;
  waitingText: TextStyle;

  // Game table start
  table: ViewStyle;

  columnRow: ViewStyle;
  columnLetter: ViewStyle;

  gameTable: ViewStyle;

  numberColumn: ViewStyle;
  numberMark: ViewStyle;

  gameTableContent: ViewStyle;
  gameTableRow: ViewStyle;
  gameTableColumn: ViewStyle;

  // Game table end

  infoText: TextStyle;

  changeMapButton: ViewStyle;

  hitPosition: ViewStyle;
  missedPosition: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.medium,
  },
  waitingText: {
    marginBottom: SPACING.small,
  },

  // Game table start
  table: {},

  columnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.large,
  },

  columnLetter: {
    width: GAME_PLOT_SIZE,
    alignItems: 'center',
  },

  gameTable: {
    flexDirection: 'row',
    paddingLeft: SPACING.large,
  },

  numberColumn: {},

  numberMark: {
    height: GAME_PLOT_SIZE,
    width: SPACING.large,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gameTableContent: {},
  gameTableRow: {
    flexDirection: 'row',
  },
  gameTableColumn: {
    width: GAME_PLOT_SIZE,
    height: GAME_PLOT_SIZE,
    backgroundColor: COLORS.WHITE,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: BORDER_WIDTH.medium,
  },

  // Game table end

  infoText: {
    marginTop: SPACING.medium,
  },

  changeMapButton: {
    marginTop: SPACING.medium,
    width: 240,
  },

  hitPosition: {
    backgroundColor: 'green',
  },
  missedPosition: {
    backgroundColor: COLORS.TEXT.DANGER,
  },
});

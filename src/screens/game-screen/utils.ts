import {SCREEN_WIDTH, SPACING} from '../../lib/design';
import {GameTableColumn, GameTablePosition} from '../../lib/types';

export const GAME_COLUMNS: GameTableColumn[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
];

export const GAME_ROWS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const GAME_PLOT_SIZE =
  (SCREEN_WIDTH - 2 * SPACING.medium - SPACING.large) / 10;

export const isPositionInArray = (
  array: GameTablePosition[],
  position: GameTablePosition,
) => {
  return array.some(item => item.x === position.x && item.y === position.y);
};

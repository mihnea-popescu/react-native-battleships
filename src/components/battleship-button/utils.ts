import {BattleshipButtonType} from './BattleshipButton';
import styles from './styles';

export function getBattleshipButtonStyle(type: BattleshipButtonType) {
  switch (type) {
    case 'primary':
      return {
        container: styles.primaryButton,
        text: styles.primaryButtonText,
        textSize: 'large',
      };
    case 'secondary':
      return {
        container: styles.secondaryButton,
        text: styles.secondaryButtonText,
        textSize: 'medium',
      };
    default:
      return {
        container: styles.primaryButton,
        text: styles.primaryButtonText,
        textSize: 'large',
      };
  }
}

import {TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import BattleshipText from '../../../../components/battleship-text/BattleshipText';
import BattleshipButton from '../../../../components/battleship-button/BattleshipButton';
import {
  GameTableDirection,
  GameTablePosition,
  Ship,
} from '../../../../lib/types';
import {GAME_COLUMNS, GAME_ROWS, isPositionInArray} from '../../utils';
import {ACTIVE_OPACITY} from '../../../../lib/design';
import FieldError from '../../../../components/field-error/FieldError';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store';
import {sendCurrentGameMapConfig} from '../../../../store/thunks/currentGameThunk';

const GameScreenMapConfig = ({gameId}: {gameId: string}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [placedShips, setPlacedShips] = React.useState<Ship[]>([]);

  const [shipCoords, setShipCoords] = React.useState<GameTablePosition[]>([]);

  const [currentSize, setCurrentSize] = React.useState<number>(3);

  const [direction, setDirection] =
    React.useState<GameTableDirection>('HORIZONTAL');

  const sentMapConfig = React.useRef<boolean>(false);

  const [errorMessage, setErrorMessage] = React.useState<string>();

  useEffect(() => {
    const positions: GameTablePosition[] = [];

    placedShips.forEach(ship => {
      if (ship.direction === 'VERTICAL') {
        for (let i = 0; i < ship.size; i++) {
          positions.push({
            x: ship.x,
            y: ship.y + i,
          });
        }
      }
      if (ship.direction === 'HORIZONTAL') {
        for (let i = 0; i < ship.size; i++) {
          positions.push({
            x: GAME_COLUMNS[GAME_COLUMNS.findIndex(col => col === ship.x) + i],
            y: ship.y,
          });
        }
      }
    });

    setShipCoords(positions);

    if (placedShips.length > 8) {
      setCurrentSize(6);
    } else if (placedShips.length > 6) {
      setCurrentSize(4);
    } else if (placedShips.length > 3) {
      setCurrentSize(3);
    } else {
      setCurrentSize(2);
    }
  }, [placedShips]);

  useEffect(() => {
    if (sentMapConfig.current) {
      return;
    }

    if (placedShips.length === 10) {
      dispatch(
        sendCurrentGameMapConfig({
          gameId,
          mapConfig: {
            ships: placedShips,
          },
        }),
      );

      sentMapConfig.current = true;
    }
  }, [placedShips, dispatch, gameId]);

  if (placedShips.length >= 10) {
    return (
      <View style={styles.container}>
        <BattleshipText
          size="large"
          text="Waiting for the other player to send their map config.."
          style={styles.waitingText}
        />
      </View>
    );
  }

  const placeShip = (position: GameTablePosition) => {
    if (placedShips.length > 9) {
      setErrorMessage('You have placed enough ships!');
      return;
    }

    // check if it is out of bounds
    if (
      direction === 'HORIZONTAL' &&
      GAME_COLUMNS.findIndex(col => col === position.x) + currentSize >
        GAME_COLUMNS.length
    ) {
      setErrorMessage('Cannot place ship here!');
      return;
    }

    if (
      direction === 'VERTICAL' &&
      position.y + currentSize > GAME_ROWS.length + 1
    ) {
      setErrorMessage('Cannot place ship here!');
      return;
    }

    // Check if a ship is already there
    if (direction === 'HORIZONTAL') {
      for (let i = 0; i < currentSize; i++) {
        if (
          isPositionInArray(
            {
              x: GAME_COLUMNS[
                GAME_COLUMNS.findIndex(col => col === position.x) + i
              ],
              y: position.y,
            },
            shipCoords,
          )
        ) {
          setErrorMessage('Cannot overlap with another ship!');
          return;
        }
      }
    }

    if (direction === 'VERTICAL') {
      for (let i = 0; i < currentSize; i++) {
        if (
          isPositionInArray(
            {
              x: position.x,
              y: position.y + i,
            },
            shipCoords,
          )
        ) {
          setErrorMessage('Cannot overlap with another ship!');
          return;
        }
      }
    }

    const ship: Ship = {
      x: position.x,
      y: position.y,
      size: currentSize,
      direction,
    };

    setPlacedShips([...placedShips, ship]);
    setErrorMessage('');
  };

  const renderTable = () => {
    const disablePlacing = placedShips.length > 9;
    return (
      <View style={styles.table}>
        <View style={styles.columnRow}>
          <View style={styles.columnLetter} />
          {GAME_COLUMNS.map(letter => (
            <View style={styles.columnLetter} key={`column-text-${letter}`}>
              <BattleshipText size="small" text={letter} />
            </View>
          ))}
        </View>
        <View style={styles.gameTable}>
          <View style={styles.numberColumn}>
            {GAME_ROWS.map(num => (
              <View style={styles.numberMark} key={`row-text-${num}`}>
                <BattleshipText size="small" text={num.toString()} />
              </View>
            ))}
          </View>
          <View style={styles.gameTableContent}>
            {GAME_ROWS.map(row => (
              <View style={styles.gameTableRow} key={`game-row-${row}`}>
                {GAME_COLUMNS.map(col => (
                  <TouchableOpacity
                    style={styles.gameTableColumn}
                    key={`game-column-${col}`}
                    activeOpacity={ACTIVE_OPACITY}
                    disabled={
                      disablePlacing ||
                      isPositionInArray({x: col, y: row}, shipCoords)
                    }
                    onPress={() => placeShip({x: col, y: row})}>
                    {isPositionInArray({x: col, y: row}, shipCoords) ? (
                      <BattleshipText size="small" text="🚢" />
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderDirectionPicker = () => (
    <View style={styles.directionRow}>
      <BattleshipButton
        type="secondary"
        text="Horizontal"
        style={[
          styles.directionButton,
          direction === 'HORIZONTAL' ? styles.directionActive : {},
        ]}
        onPress={() => setDirection('HORIZONTAL')}
      />

      <BattleshipButton
        type="secondary"
        text="Vertical"
        style={[
          styles.directionButton,
          direction === 'VERTICAL' ? styles.directionActive : {},
        ]}
        onPress={() => setDirection('VERTICAL')}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {errorMessage && <FieldError errors={[errorMessage]} />}
      <BattleshipText
        size="medium"
        text="You need to place your ships on the table."
      />
      {renderTable()}
      <BattleshipText
        size="medium"
        text={`You need to place ${10 - placedShips.length} more ships`}
        style={styles.infoText}
      />
      <BattleshipText
        size="medium"
        text={`Ship size: ${currentSize}`}
        style={styles.infoText}
      />
      {renderDirectionPicker()}
    </View>
  );
};

export default GameScreenMapConfig;

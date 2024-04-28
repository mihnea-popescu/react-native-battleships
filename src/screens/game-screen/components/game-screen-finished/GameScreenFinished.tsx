import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import useCurrentGame from '../../../../hooks/useCurrentGame';
import {GameMove, User} from '../../../../lib/types';
import BattleshipText from '../../../../components/battleship-text/BattleshipText';
import BattleshipButton from '../../../../components/battleship-button/BattleshipButton';
import {GAME_COLUMNS, GAME_ROWS, isPositionInArray} from '../../utils';
import {Icon} from 'react-native-paper';
import {ACTIVE_OPACITY} from '../../../../lib/design';

const GameScreenFinished = ({gameId}: {gameId: string}) => {
  const {game} = useCurrentGame(gameId);

  const [replay, setReplay] = React.useState<boolean>(false);

  const [currentMoveIndex, setCurrentMoveIndex] = React.useState<number>(0);

  const [player1Moves, setPlayer1Moves] = React.useState<GameMove[]>([]),
    [player2Moves, setPlayer2Moves] = React.useState<GameMove[]>([]);

  const totalMoves: number = React.useMemo(() => {
    return game?.moves.length ?? 0;
  }, [game]);

  const currentMove = React.useMemo(() => {
    return game?.moves[currentMoveIndex];
  }, [game, currentMoveIndex]);

  const player1Ships = React.useMemo(() => {
    if (!game) {
      return [];
    }

    return game.shipsCoord.filter(ship => ship.playerId === game.player1Id);
  }, [game]);

  const player2Ships = React.useMemo(() => {
    if (!game) {
      return [];
    }

    return game.shipsCoord.filter(ship => ship.playerId === game.player2Id);
  }, [game]);

  const winner: User | null = React.useMemo(() => {
    if (!game) {
      return null;
    }

    if (game.playerToMoveId === game.player1Id) {
      return game.player2;
    }

    return game.player1;
  }, [game]);

  const showReplay = () => {
    // Append first move to player1 moves
    setPlayer1Moves([...(currentMove ? [currentMove] : [])]);

    setReplay(true);
  };

  // Move made by player2, need to show player1
  const showPlayer1Table = () => {
    return (
      <>
        <BattleshipText
          size="medium"
          text={`Move by: ${game?.player2?.email}`}
          style={styles.infoText}
        />
        <BattleshipText
          size="medium"
          text={`Showing table of: ${game?.player1?.email}`}
          style={styles.infoText}
        />
        <BattleshipText
          size="medium"
          text={`Move #${currentMoveIndex + 1}/${totalMoves}`}
          style={styles.infoText}
        />
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
                  {GAME_COLUMNS.map(col => {
                    const hit = player2Moves.find(
                      s => s.x === col && s.y === row,
                    );

                    const hitStyle = hit
                      ? hit.result
                        ? styles.hitPosition
                        : styles.missedPosition
                      : {};

                    return (
                      <View
                        style={[styles.gameTableColumn, hitStyle]}
                        key={`game-column-${col}`}>
                        {isPositionInArray({x: col, y: row}, player1Ships) ? (
                          <BattleshipText size="small" text="🚢" />
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </>
    );
  };

  // Move made by player1, show player 2 table
  const showPlayer2Table = () => {
    return (
      <>
        <BattleshipText
          size="medium"
          text={`Move by: ${game?.player1.email}`}
          style={styles.infoText}
        />
        <BattleshipText
          size="medium"
          text={`Showing table of: ${game?.player2?.email}`}
          style={styles.infoText}
        />
        <BattleshipText
          size="medium"
          text={`Move #${currentMoveIndex + 1}/${totalMoves}`}
          style={styles.infoText}
        />
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
                  {GAME_COLUMNS.map(col => {
                    const hit = player1Moves.find(
                      s => s.x === col && s.y === row,
                    );

                    const hitStyle = hit
                      ? hit.result
                        ? styles.hitPosition
                        : styles.missedPosition
                      : {};

                    return (
                      <View
                        style={[styles.gameTableColumn, hitStyle]}
                        key={`game-column-${col}`}>
                        {isPositionInArray({x: col, y: row}, player2Ships) ? (
                          <BattleshipText size="small" text="🚢" />
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </>
    );
  };

  const replayBack = () => {
    if (currentMoveIndex <= 0 || !currentMove) {
      return;
    }

    if (currentMove.playerId === game?.player1Id) {
      const copyOfPlayer1Moves = [...player1Moves];
      copyOfPlayer1Moves.pop();
      setPlayer1Moves(copyOfPlayer1Moves);
    } else {
      const copyOfPlayer2Moves = [...player2Moves];
      copyOfPlayer2Moves.pop();
      setPlayer2Moves(copyOfPlayer2Moves);
    }

    setCurrentMoveIndex(currentMoveIndex - 1);
  };

  const replayForward = () => {
    if (currentMoveIndex >= totalMoves - 1 || !currentMove) {
      return;
    }

    if (currentMove.playerId === game?.player1Id) {
      setPlayer1Moves([...player1Moves, currentMove]);
    } else {
      setPlayer2Moves([...player2Moves, currentMove]);
    }
    setCurrentMoveIndex(currentMoveIndex + 1);
  };

  const replayArrows = () => {
    return (
      <View style={styles.replayArrowsContainer}>
        <View style={styles.replayArrow}>
          {currentMoveIndex > 0 && (
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={replayBack}>
              <Icon source="arrow-left" size={50} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.replayArrow}>
          {currentMoveIndex < totalMoves - 1 && (
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={replayForward}>
              <Icon source="arrow-right" size={50} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (!replay) {
    return (
      <View style={styles.container}>
        <BattleshipText text="Game is finished." size="large" />
        {winner && (
          <BattleshipText
            size="large"
            text={`Winner: ${winner.email}`}
            style={styles.infoText}
          />
        )}
        <BattleshipButton
          text="Show replay"
          style={styles.changeMapButton}
          onPress={showReplay}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentMoveIndex === totalMoves - 1 && (
        <BattleshipText
          text={`Winner: ${winner?.email}`}
          size="large"
          style={styles.infoText}
        />
      )}
      {currentMove?.playerId === game?.player1Id && showPlayer2Table()}
      {currentMove?.playerId === game?.player2Id && showPlayer1Table()}
      {replayArrows()}
    </View>
  );
};

export default GameScreenFinished;

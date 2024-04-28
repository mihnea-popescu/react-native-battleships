import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import useCurrentGame from '../../../../hooks/useCurrentGame';
import useUserProfile from '../../../../hooks/useUserProfile';
import styles from './styles';
import BattleshipText from '../../../../components/battleship-text/BattleshipText';
import BattleshipButton from '../../../../components/battleship-button/BattleshipButton';
import {GAME_COLUMNS, GAME_ROWS, isPositionInArray} from '../../utils';
import {PlayerStrike} from '../../../../lib/types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store';
import {sendStrike} from '../../../../store/thunks/currentGameThunk';

type ShownMap = 'player' | 'opponent';

const GameScreenActive = ({gameId}: {gameId: string}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {profile} = useUserProfile();
  const {game} = useCurrentGame(gameId);

  const [shownMap, setShownMap] = React.useState<ShownMap>('opponent');

  const [hasSentHit, setHasSentHit] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (game?.playerToMoveId === profile?.user.id) {
      setHasSentHit(false);
    }
  }, [game?.playerToMoveId, profile?.user.id]);

  const strikes = React.useMemo(() => {
    return {
      player: game?.moves.filter(move => move.playerId === profile?.user.id),
      opponent: game?.moves.filter(move => move.playerId !== profile?.user.id),
    };
  }, [profile?.user.id, game?.moves]);

  const sendHit = (position: PlayerStrike) => {
    if (hasSentHit) {
      return;
    }

    dispatch(
      sendStrike({
        gameId,
        strike: position,
      }),
    );
    setHasSentHit(true);
  };

  const showOpponentMap = () => {
    return (
      <>
        <BattleshipText
          size="medium"
          text="Currently viewing opponent's map"
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
                    const hit = (strikes.player ?? []).find(
                      s => s.x === col && s.y === row,
                    );

                    const hitStyle = hit
                      ? hit.result
                        ? styles.hitPosition
                        : styles.missedPosition
                      : {};

                    return (
                      <TouchableOpacity
                        style={[styles.gameTableColumn, hitStyle]}
                        key={`game-column-${col}`}
                        disabled={!!hit || hasSentHit}
                        onPress={() => sendHit({x: col, y: row})}>
                        {hit?.result ? (
                          <BattleshipText size="small" text="🚢" />
                        ) : null}
                      </TouchableOpacity>
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

  const showPlayerMap = () => {
    return (
      <>
        <BattleshipText
          size="medium"
          text="Currently viewing your map"
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
                    const hit = (strikes.opponent ?? []).find(
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
                        {isPositionInArray(
                          {x: col, y: row},
                          game?.shipsCoord,
                        ) ? (
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

  const showChangeMap = () => {
    return (
      <BattleshipButton
        type="secondary"
        style={styles.changeMapButton}
        text={
          shownMap === 'player' ? "Show the opponent's map" : 'Show your map'
        }
        onPress={() =>
          shownMap === 'opponent'
            ? setShownMap('player')
            : setShownMap('opponent')
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {game?.playerToMoveId === profile?.user.id ? (
        <>
          <BattleshipText
            size="medium"
            text="It is your turn to strike!"
            style={styles.waitingText}
          />
          {shownMap === 'player' ? (
            <BattleshipText
              size="medium"
              text="Switch to the opponent's map to strike"
              style={styles.waitingText}
            />
          ) : null}
        </>
      ) : (
        <BattleshipText
          size="medium"
          text="Waiting for the opponent to strike"
          style={styles.waitingText}
        />
      )}
      {shownMap === 'opponent' && showOpponentMap()}
      {shownMap === 'player' && showPlayerMap()}
      {showChangeMap()}
    </View>
  );
};

export default GameScreenActive;

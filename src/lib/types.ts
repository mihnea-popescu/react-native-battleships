export interface User {
  id: string;
  email: string;
}

export interface UserDetails {
  currentlyGamesPlaying: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  user: User;
}

export interface APIError {
  code: number;
  message: string;
}

export type APIResponseBody = APIError;

export interface APIResponse {
  success: boolean;
  data?: APIResponseBody;
}

export type RequestStatus = 'initial-loading' | 'loading' | 'success' | 'error';

export type GameTableColumn =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J';
export type GameTableDirection = 'HORIZONTAL' | 'VERTICAL';

export interface GameTablePosition {
  x: GameTableColumn;
  y: number;
}

export interface PlayerStrike {
  x: GameTableColumn;
  y: number;
}

interface GameMove {
  x: GameTableColumn;
  y: number;
  result: boolean;
  playerId: string;
}

type GameStatus = 'CREATED' | 'MAP_CONFIG' | 'ACTIVE' | 'FINISHED';

export interface Game {
  id: string;
  status: GameStatus;
  moves: GameMove[];
  player1: User;
  player2: User | null;
  player1Id: string;
  player2Id: string | null;
  playerToMoveId: string;
  shipsCoord: Ship[];
}

export interface GameListGame {
  id: string;
  status: GameStatus;
  player1: User;
  player2: User | null;
  player1Id: string;
  player2Id: string | null;
  playerToMoveId: string;
}

export interface GameList {
  total: number;
  games: GameListGame[];
}

export interface JoinGameResponse {
  id: string;
  status: GameStatus;
  player1Id: string;
  player2Id: string;
  playerToMoveId: string;
}

export interface Ship {
  x: GameTableColumn;
  y: number;
  size: number;
  direction: GameTableDirection;
  playerId?: string;
}

export interface MapConfigBody {
  ships: Ship[];
}

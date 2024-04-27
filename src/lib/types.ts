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

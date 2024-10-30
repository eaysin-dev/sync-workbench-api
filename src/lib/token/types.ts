// types.ts

export interface AccessTokenPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

export interface RefreshTokenPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

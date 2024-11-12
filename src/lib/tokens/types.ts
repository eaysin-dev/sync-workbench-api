export interface AccessTokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

export interface RefreshTokenPayload {
  id: string;
}

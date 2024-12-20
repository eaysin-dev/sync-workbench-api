import { ObjectId } from "mongoose";

export interface AccessTokenPayload {
  id: string;
  username: string;
  email: string;
  role: ObjectId;
  status: string;
}

export interface RefreshTokenPayload {
  id: string;
}

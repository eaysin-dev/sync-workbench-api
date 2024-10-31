import { AccessTokenPayload, RefreshTokenPayload } from "@/lib/token";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: AccessTokenPayload | RefreshTokenPayload;
}

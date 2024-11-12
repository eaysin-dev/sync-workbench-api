import { AccessTokenPayload, RefreshTokenPayload } from "@/lib/tokens/types";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: AccessTokenPayload | RefreshTokenPayload;
}

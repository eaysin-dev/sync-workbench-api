import { Document, Schema, Types, model } from "mongoose";
import { IPermission } from "./Permission";
import { IRole } from "./Role";

export interface IRolePermission extends Document {
  role: Types.ObjectId | IRole;
  permission: Types.ObjectId | IPermission;
}

const rolePermissionSchema = new Schema<IRolePermission>(
  {
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    permission: {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },
  { timestamps: true }
);

export const RolePermission = model<IRolePermission>(
  "RolePermission",
  rolePermissionSchema
);

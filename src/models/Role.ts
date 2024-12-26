import { Document, Schema, model } from "mongoose";

export interface IRole extends Document {
  name: string;
  description?: string;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Role = model<IRole>("Role", roleSchema);

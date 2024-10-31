import { Document, Schema, model } from "mongoose";

export type Role = "Admin" | "Manager" | "Employee" | "HR" | "Guest";
export type Status =
  | "Active"
  | "Inactive"
  | "Suspended"
  | "OnLeave"
  | "Pending";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: Role;
  status: Status;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee", "HR", "Guest"],
      default: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended", "OnLeave", "Pending"],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;

import { Document, model, ObjectId, Schema } from "mongoose";

export interface IEmployee extends Document {
  user: ObjectId;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  country: string;
  date_of_birth: Date;
  date_of_hire: Date;
  employment_status: string;
  phone_number: string;
  position: string;
  salary: number;
  state: string;
  zip_code: string;
  certifications: string[];
  department: string;
  job_title: string;
  manager: string;
  skills: string[];
  isComplete: boolean;
}

const employeeSchema = new Schema<IEmployee>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String, match: /^\+\d{1,15}$/ },
  date_of_birth: { type: Date },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zip_code: { type: String },
  date_of_hire: { type: Date },
  job_title: { type: String, default: null },
  department: { department_id: { type: String } },
  manager: { manager_id: { type: String } },
  position: { position_id: { type: String } },
  salary: { type: Number, min: 0 },
  employment_status: {
    type: String,
    enum: ["Active", "Inactive", "Suspended", "Terminated"],
  },
  skills: { type: [String], default: [] },
  certifications: { type: [String], default: [] },
  isComplete: { type: Boolean, default: false },
});

employeeSchema.pre("save", function (next) {
  const employee = this as IEmployee;

  const essentialFieldsFilled = [
    employee.first_name,
    employee.last_name,
    employee.address,
    employee.city,
    employee.state,
    employee.country,
    employee.zip_code,
    employee.phone_number,
    employee.position,
    employee.date_of_birth,
    employee.date_of_hire,
  ].every((field) => field !== undefined && field !== "");

  employee.isComplete = essentialFieldsFilled;

  next();
});

const Employee = model<IEmployee>("Employee", employeeSchema);

export default Employee;

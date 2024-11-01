import { EmployeeSchemaType } from "@/schemas";
import { model, Schema } from "mongoose";

export interface IEmployee extends Document, EmployeeSchemaType {}

const EmployeeSchema = new Schema<IEmployee>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    match: /^\+\d{1,15}$/,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  date_of_hire: {
    type: Date,
    required: true,
  },
  job_title: {
    type: String,
    default: null,
  },
  department: {
    department_id: {
      type: String,
    },
  },
  manager: {
    manager_id: {
      type: String,
    },
  },
  position: {
    position_id: {
      type: String,
      required: true,
    },
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  employment_status: {
    type: String,
    required: true,
    enum: ["Active", "Inactive", "Suspended", "Terminated"],
  },
  skills: {
    type: [String],
    default: [],
  },
  certifications: {
    type: [String],
    default: [],
  },
  profile_picture: {
    type: String,
    default: null,
  },
});

const Employee = model("Employee", EmployeeSchema);

export default Employee;

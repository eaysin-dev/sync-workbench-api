import { IdSchemaType } from "@/schemas/shared/id";
import { PopulateOptions } from "mongoose";

export interface IdWithPopulateType {
  id: IdSchemaType;
  populate?: PopulateOptions | (string | PopulateOptions)[];
}

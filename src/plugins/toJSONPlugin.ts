import mongoose, { Schema } from "mongoose";

const toJSONPlugin = (schema: Schema) => {
  schema.set("toJSON", {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret.__v;
    },
  });
};

mongoose.plugin(toJSONPlugin);

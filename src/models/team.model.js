import { model, Schema } from "mongoose";

export const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const TeamModel = model("Team", TeamSchema);

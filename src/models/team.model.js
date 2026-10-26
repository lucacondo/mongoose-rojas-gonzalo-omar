import { model, Schema } from "mongoose";

export const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  category: {
    type: String,
    required: true,
  },
});

export const TeamModel = model("Team", TeamSchema);

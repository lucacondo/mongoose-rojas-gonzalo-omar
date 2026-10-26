import { model, Schema } from "mongoose";

export const CaptainSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
    unique: true,
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
});

export const CaptainModel = model("Captain", CaptainSchema);

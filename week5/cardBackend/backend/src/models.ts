import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  interest: {
    type: [String],
    required: true,
  },
  socials: {
    type: [String],
    required: true,
  },
});

export const Card = mongoose.model("Card", cardSchema);

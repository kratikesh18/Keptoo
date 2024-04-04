import { Schema, model, models } from "mongoose";

type UserType = {
  name: string;
  email: string;
  image: string;
};

const userScheama = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Date,
  },
});

export const User = models?.User || model("User", userScheama);

import { Schema, model } from "mongoose";

import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const subscriptionList = ["starter", "pro", "business"]

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userAuthSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const updateSibscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const User = model("user", userSchema);

export default User;

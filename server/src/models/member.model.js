import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

// user database
const memberSchema = new mongoose.Schema(
  {
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Manager",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    avatarColor: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      enum: ["MEMBER"],
    },
  },
  modelOptions
);

// convert password to hash function
memberSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

// validate user password function
memberSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.password === hash;
};

const memberModel = mongoose.model("Member", memberSchema);

export default memberModel;

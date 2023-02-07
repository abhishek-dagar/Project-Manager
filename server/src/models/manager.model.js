import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

// user database
const userSchema = new mongoose.Schema(
  {
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
    avatarColor:{
      type:String,
      required:true,
    },
    designation:{
      type:String,
      required:true,
      enum:['MANAGER']
    }
  },
  modelOptions
);

// convert password to hash function
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

// validate user password function
userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.password === hash;
};

const userModel = mongoose.model("Manager", userSchema);

export default userModel;

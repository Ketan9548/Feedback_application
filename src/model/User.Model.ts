import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifycode: string;
  VerifycodeExpiry: Date;
  isverified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "please use a valid email",
    ],
    unique: true,
  },
  password: { type: String, required: [true, "password is required"] },
  verifycode: { type: String, required: [true, "verifycode is required"] },
  VerifycodeExpiry: {
    type: Date,
    required: [true, "verifycode expire is required"],
  },
  isverified: { type: Boolean, default: false },
  isAcceptingMessage: { type: Boolean, default: true },
  message: [messageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;

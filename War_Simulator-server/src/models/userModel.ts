import { Model, model, Schema, Types, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IMissileUserType {
  name: string;
  amount: number;
}

export interface IUser extends Document {
  username: string;
  password: string;
  organization: string;
  region?: string; 
  userMissiles: IMissileUserType[];
  userBudget: number;
}

const MissileUserSchema: Schema = new Schema<IMissileUserType>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: String, required: true },
  region: { type: String },
  userMissiles: { type: [MissileUserSchema], required: true },
  userBudget: { type: Number, required: true },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
  }
  next();
});

const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;
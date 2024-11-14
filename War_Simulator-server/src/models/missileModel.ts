import { model, Schema, Document, Model } from "mongoose";

export interface IMissile extends Document {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
}

const MissileSchema = new Schema<IMissile>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    speed: { type: Number, required: true },
    intercepts: { type: [String], required: true },
    price: { type: Number, required: true },
});

const Missile: Model<IMissile> = model<IMissile>("Missile", MissileSchema);
export default Missile;
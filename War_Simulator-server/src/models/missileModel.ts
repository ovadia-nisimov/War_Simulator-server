import mongoose, { Schema, Types, Document, Model } from "mongoose";


export interface IMissile extends Document {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
}

const missileSchema: Schema<IMissile> = new Schema<IMissile>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    speed: { type: Number, required: true },
    intercepts: [{ type: String }],
    price: { type: Number, required: true }
});

export const Missile: Model<IMissile> = mongoose.model<IMissile>('Missile', missileSchema);

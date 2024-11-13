import mongoose, { Schema, Types, Document, Model } from "mongoose";

export interface ILaunch extends Document {
    missileType: string;
    origin: string;
    target: string;
    launchTime: Date;
}

const launchSchema: Schema<ILaunch> = new Schema<ILaunch>({
    missileType: { type: String, required: true },
    origin: { type: String, required: true },
    target: { type: String, required: true },
    launchTime: { type: Date, required: true, default: Date.now }
});

export const Launch: Model<ILaunch> = mongoose.model<ILaunch>('Launch', launchSchema);

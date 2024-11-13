import mongoose, { Schema, Types, Document, Model } from "mongoose";


export interface IInterception extends Document {
    interceptorType: string;
    targetMissile: string;
    location: string;
    success: boolean;
    interceptionTime: Date;
}

const interceptionSchema: Schema<IInterception> = new Schema<IInterception>({
    interceptorType: { type: String, required: true },
    targetMissile: { type: String, required: true },
    location: { type: String, required: true },
    success: { type: Boolean, required: true },
    interceptionTime: { type: Date, required: true, default: Date.now }
});

export const Interception: Model<IInterception> = mongoose.model<IInterception>('Interception', interceptionSchema);

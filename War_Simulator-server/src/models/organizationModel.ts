import mongoose, { Schema, Types, Document, Model } from "mongoose";


export interface IOrganization extends Document {
    name: string;
    resources: { name: string; amount: number }[];
    budget: number;
}

const organizationSchema: Schema<IOrganization> = new Schema<IOrganization>({
    name: { type: String, required: true, unique: true },
    resources: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true }
        }
    ],
    budget: { type: Number, required: true, default: 0 }
});

export const Organization: Model<IOrganization> = mongoose.model<IOrganization>('Organization', organizationSchema);

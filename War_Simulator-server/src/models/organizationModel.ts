import { Model, model, Schema } from "mongoose";

export interface IResource extends Document {
  name: string;
  amount: number;
}

export interface IOrganization extends Document {
  name: string;
  resources: IResource[];
  budget: number;
}

const ResourceSchema: Schema = new Schema<IResource>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

const OrganizationSchema: Schema = new Schema<IOrganization>({
  name: { type: String, required: true, unique: true },
  resources: { type: [ResourceSchema], required: true },
  budget: { type: Number, required: true },
});

const Organization: Model<IOrganization> = model<IOrganization>("Organization", OrganizationSchema);
export default Organization;
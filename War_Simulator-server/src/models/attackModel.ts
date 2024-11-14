// src/models/attackModel.ts

import { model, Schema, Document, Model } from "mongoose";

export interface IAttack extends Document {
  name: string;
  timeToHit: number;
  regionAttacked: string;
  attackerId: string;
  interceptedId?: string;
  intercepted: boolean;
  status: string;
}

const AttackSchema = new Schema<IAttack>({
  name: { type: String, required: true },
  timeToHit: { type: Number, required: true },
  regionAttacked: { type: String, required: true },
  attackerId: { type: String, required: true },
  interceptedId: { type: String },
  intercepted: { type: Boolean, default: false },
  status: { type: String, default: "Launched" },
});

const Attack : Model<IAttack> = model<IAttack>("Attack", AttackSchema);
export default Attack;
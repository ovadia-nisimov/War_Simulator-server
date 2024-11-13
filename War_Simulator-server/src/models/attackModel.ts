import { model, Schema, Document, Model } from "mongoose";

export interface IAttack extends Document {
  name: string;
  tymeToHit: number;
  id_attacker: string;
  id_intercepted?: string;
  AttackArea: string;
}

const AttackSchema = new Schema<IAttack>({
  name: { type: String, required: true },
  tymeToHit: { type: Number, required: true },
  id_attacker: { type: String, required: true },
  id_intercepted: { type: String },
  AttackArea: { type: String, required: true },
});

export const Attack : Model<IAttack> = model<IAttack>("Attack", AttackSchema);

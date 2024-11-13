import mongoose, { Schema, Types, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    password: string;
    organization: string;
    area?: string;
    missiles: { type: string; quantity: number }[];
    budget: number;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    organization: { type: String, required: true },
    area: { type: String },
    missiles: [
        {
            type: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    budget: { type: Number, required: true, default: 0 }
});

// הצפנת הסיסמה
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
    next();
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

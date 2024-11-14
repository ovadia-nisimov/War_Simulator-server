import { RegisterDTO, LoginDTO } from "../DTO/userDTO";
import Organization from "../models/organizationModel";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUserService = async (userData: RegisterDTO): Promise<IUser> => {
    const existingUser = await User.findOne({ username: userData.username });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const orgName = userData.region ? `${userData.organization} - ${userData.region}` : userData.organization;
    const org = await Organization.findOne({ name: orgName });

    if (!org) {
        throw new Error("Organization not found");
    }

    const userMissiles = org.resources.map(resource => ({
        name: resource.name,
        amount: resource.amount
    }));
    const userBudget = org.budget;

    return await User.create({
        username: userData.username,
        password: userData.password,
        organization: userData.organization,
        region: userData.region,
        userMissiles,
        userBudget
    });
};

export const loginUserService = async (userData: LoginDTO): Promise<{ user: IUser, token: string }> => {
    const user = await User.findOne({ username: userData.username });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return { user, token };
};
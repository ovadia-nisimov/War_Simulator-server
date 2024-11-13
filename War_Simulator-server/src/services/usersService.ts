import LoginDto from "../DTO/LoginDto";
import RegisterDto  from "../DTO/RegisterDto";
import { Organization } from "../models/organizationModel";
import { User, IUser } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const UserRegister = async (user: RegisterDto): Promise<IUser> => {

    const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const orgName = user.area ? `${user.organization} - ${user.area}` : `${user.organization}`;

    const org = await Organization.findOne({ name: orgName });

    if (!org) {
        throw new Error("Organization not found");
    }

    const userMissiles = org.resources.map(resource => ({
        type: resource.name,  
        quantity: resource.amount  
    }));
    const userBudget = org.budget;

    return await User.create({
        username: user.username,
        password: user.password,
        organization: user.organization,
        area: user.area,
        missiles: userMissiles,  
        budget: userBudget
    });
};



export const userLogin = async (user: LoginDto): Promise<{userFromDatabase: IUser, token: string}> => {
    const userFromDatabase = await User.findOne({ username: user.username });
    if (!userFromDatabase) throw new Error("user not found");

    // בדיקת הסיסמה
    const isMatch = await bcrypt.compare(user.password, userFromDatabase.password);
    if (!isMatch) throw new Error("wrong password");
    
    // יצירת JWT
    const token = jwt.sign({ id: userFromDatabase?._id, username: userFromDatabase?.username }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    });
    return {userFromDatabase, token};
};







import LoginDto from "../DTO/LoginDto";
import RegisterDto  from "../DTO/RegisterDto";
import { User, IUser } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userLogin = async (user: LoginDto) => {
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



export const UserRegister = async (user: RegisterDto) => {
    //להוסיף פה ליוזר את הטילים שלו לפי הארגון שהוא בחר בקליינט
    const newUser: IUser = await User.create(user);
    return newUser;
   
 
};



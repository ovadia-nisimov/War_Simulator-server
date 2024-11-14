// src/services/attackService.ts

import Attack from "../models/attackModel";
import User from "../models/userModel";
import Missile from "../models/missileModel";
import { AttackCreationData } from "../DTO/attackDTO";

export const createAttackService = async (attackData: AttackCreationData) => {
    const user = await User.findById(attackData.attackerId).lean();
    if (!user) throw new Error("User not found");
    
    console.log("User found:", user);

    const weapon = user.userMissiles.find(
        (resource) => resource.name === attackData.name
    );

    if (!weapon) {
        console.error("Weapon not found for user:", attackData.name);
        throw new Error("Weapon not found");
    }

    if (weapon.amount < 1) {
        console.error("Not enough resources for weapon:", weapon);
        throw new Error("Not enough resources");
    }

    await User.updateOne(
        { _id: attackData.attackerId, "userMissiles.name": attackData.name },
        { $inc: { "userMissiles.$.amount": -1 } }
    );

    const missile = await Missile.findOne({ name: attackData.name });
    if (!missile) throw new Error("Missile not found");

    const newAttack = new Attack({
        ...attackData,
        timeToHit: missile.speed,
    });

    await newAttack.save();
    return newAttack;
};

export const getAttacksByUserService = async (userId: string) => {
    const attacks = await Attack.find({ attackerId: userId }).lean();
    return attacks;
};
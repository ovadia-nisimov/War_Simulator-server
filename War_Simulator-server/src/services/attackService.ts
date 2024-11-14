import Attack, { IAttack } from "../models/attackModel";
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

export const getAttacksByRegionServise = async (id: string) => {
  const user = await User.findById(id).lean();
  if (!user) throw new Error("user not found");
  const attacks = await Attack.find({ regionAttacked: user.region }).lean();
  return attacks;
};

export const updateAttackStatusService = async (attackId: string, status: string, missileName?: string, interceptorId?: string) => {
    const attack = await Attack.findById(attackId);
    if (!attack) throw new Error("Attack not found");
  
    if (status === "Intercepted") {
      if (!missileName || !interceptorId) throw new Error("Interceptor information missing");
  
      const missile = await Missile.findOne({ name: missileName });
      if (!missile) throw new Error("Interceptor missile not found");
  
      if (!missile.intercepts || !missile.intercepts.includes(attack.name)) {
        throw new Error("This missile is not capable of intercepting the attack");
      }
  
      attack.status = "Intercepted";
      attack.timeToHit = 0;
      attack.interceptedId = interceptorId;
    } else {
      attack.status = status;
      attack.timeToHit = 0;
    }
  
    await attack.save();
    return attack;
  };
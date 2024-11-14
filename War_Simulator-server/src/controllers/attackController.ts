import { Request, Response } from "express";
import { createAttackService, getAttacksByUserService, getAttacksByRegionServise, updateAttackStatusService } from "../services/attackService";
import { AttackCreationData } from "../DTO/attackDTO";

export const launchAttack = async (req: Request, res: Response) => {
  try {
    const { missileName, regionAttacked } = req.body;
    const attackerId = (req as any).user.id;

    const attackData: AttackCreationData = {
      name: missileName,
      regionAttacked,
      attackerId,
    };

    const attack = await createAttackService(attackData);

    res.status(201).json(attack);
  } catch (error) {
    console.error("Error launching attack:", error);

    res.status(400).json({ error: "Failed to launch attack" });
  }
};

export const getUserAttacks = async (req: Request, res: Response) => {
  try {
    
    const userId = (req as any).user.id;
    console.log(userId);
    const attacks = await getAttacksByUserService(userId);
    console.log(userId, attacks);
    
    res.status(200).json(attacks);
  } catch (error) {
    console.error("Error fetching user attacks:", error);
    res.status(400).json({ error: "Failed to fetch user attacks" });
  }
};

export const getAttacksByRegion = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const attacks = await getAttacksByRegionServise(userId);
    res.status(200).json(attacks);
  } catch (error) {
    console.error("Error fetching attacks by region:", error);
    res.status(400).json({ error: "Failed to fetch attacks by region" });
  }
};

export const updateAttackStatus = async (req: Request, res: Response) => {
  try {
    const { attackId, status } = req.body;
    console.log(attackId, status);
    
    const updatedAttack = await updateAttackStatusService(attackId, status);
    res.status(200).json(updatedAttack);
  } catch (error) {
    console.error("Error updating attack status:", error);
    res.status(400).json({ error: "Failed to update attack status" });
  }
};
import { UserEntity } from "../entities";
import { Request } from "express";

export type PayloadType = {
  uuid: string;
};

export type CreateTitleType = {
  title: string;
  userId: UserEntity;
};

export interface AuthRequest extends Request {
  user?: UserEntity;
}

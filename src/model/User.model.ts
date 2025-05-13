import { RoleModel } from "./Role.model";

export class UserModel {
    id!: number;
    username!: string;
    name!: string;
    password!: string;
    role!: RoleModel;
    status!: number;
    created_at!: Date;
  }
  
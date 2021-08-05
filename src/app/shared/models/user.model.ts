import {BaseModel} from "./base.model";

export class UserModel extends BaseModel {
  name: string;
  email: string;
  gender: string;
  status: string;

  constructor(id: number, created_at: string, updated_at: string, name: string, email: string, gender: string, status: string) {
    super(id, created_at, updated_at);
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.status = status;
  }
}

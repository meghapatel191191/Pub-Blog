import {BaseModel} from "./base.model";

export class PostModel extends BaseModel {
  title: string;
  body: string;
  user_id: number;

  constructor(id: number, created_at: string, updated_at: string, title: string, body: string, user_id: number) {
    super(id, created_at, updated_at);
    this.title = title;
    this.body = body;
    this.user_id = user_id;
  }
}

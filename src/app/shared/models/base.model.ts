export class BaseModel {
  id: number;
  created_at: string | Date;
  updated_at: string;

  constructor(id: number, created_at: string, updated_at: string) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

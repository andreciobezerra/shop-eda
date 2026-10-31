import { EntityModel } from "../shared/domain/entity.model";

export interface UserModel extends EntityModel {
  name: string;
  email: string;
  birthdate: Date;
  idDocument: string;
}

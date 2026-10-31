import { IDto } from "../shared/interfaces/dto.interface";
import { UserModel } from "./user.model";

export class UserDto implements IDto<UserModel> {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly birthdate: Date;
  readonly idDocument: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private readonly entity: UserModel;

  constructor(entity: UserModel) {
    this.entity = entity;
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.birthdate = entity.birthdate;
    this.idDocument = entity.idDocument;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  toEntity(): UserModel {
    return this.entity;
  }
}

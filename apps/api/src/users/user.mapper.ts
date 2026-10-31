import { Injectable } from "@nestjs/common";
import { BaseMapper } from "../shared/mappers/base.mapper";
import { UserDto } from "./user.dto";
import { UserModel } from "./user.model";

@Injectable()
export class UserMapper extends BaseMapper<UserModel, UserDto> {
  fromEntity(entity: UserModel): UserDto {
    return new UserDto(entity);
  }
}

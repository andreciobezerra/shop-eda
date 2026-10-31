import { Inject, Injectable } from "@nestjs/common";
import { CrudService } from "../shared/services/crud.service";
import { UserDto } from "./user.dto";
import { UserMapper } from "./user.mapper";
import { UserModel } from "./user.model";
import { UserRepository } from "./user.repository";
import { CreateUserInput, UpdateUserInput } from "./user.schema";

@Injectable()
export class UserService extends CrudService<
  UserModel,
  UserDto,
  CreateUserInput,
  UpdateUserInput
> {
  constructor(
    @Inject(UserRepository) protected readonly userRepository: UserRepository,
    protected readonly userMapper: UserMapper,
  ) {
    super(userRepository, userMapper);
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.userRepository.findByEmail(email);

    return user ? this.userMapper.fromEntity(user) : null;
  }
}

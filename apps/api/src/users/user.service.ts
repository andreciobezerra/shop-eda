import { Injectable } from "@nestjs/common";
import { CrudService } from "../shared/services/crud.service";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService extends CrudService<User> {
  constructor(protected readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}

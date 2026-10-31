import { CrudRepository } from "../shared/domain/crud.repository";
import { UserModel } from "./user.model";
import { CreateUserInput, UpdateUserInput } from "./user.schema";

export interface UserRepository extends CrudRepository<
  UserModel,
  CreateUserInput,
  UpdateUserInput
> {
  findByEmail(email: string): Promise<UserModel | null>;
}

export const UserRepository = Symbol("UserRepository");

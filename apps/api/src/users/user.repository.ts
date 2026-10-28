import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/core";
import { CrudRepository } from "../shared/repositories/crud.repository";
import { User } from "./user.entity";

@Injectable()
export class UserRepository extends CrudRepository<User> {
  constructor(em: EntityManager) {
    super(em, User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }
}

import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/core";
import { MikroOrmCrudRepository } from "../shared/infrastructure/mikro-orm/mikro-orm-crud.repository";
import { User } from "./user.entity";
import { UserModel } from "./user.model";
import { UserRepository } from "./user.repository";

@Injectable()
export class MikroOrmUserRepository
  extends MikroOrmCrudRepository<User>
  implements UserRepository
{
  constructor(em: EntityManager) {
    super(em, User);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.em.findOne(User, { email });
  }
}

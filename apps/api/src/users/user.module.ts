import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserMapper } from "./user.mapper";
import { MikroOrmUserRepository } from "./user.mikro-orm.repository";
import { UserRepository } from "./user.repository";

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserMapper,
    {
      provide: UserRepository,
      useClass: MikroOrmUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}

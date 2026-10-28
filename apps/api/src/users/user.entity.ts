import { defineEntity, p } from "@mikro-orm/core";
import { BaseEntitySchema } from "../shared/entities/base.entity";

const UserSchema = defineEntity({
  name: "User",
  tableName: "users",
  extends: BaseEntitySchema,
  properties: {
    name: p.string(),
    email: p.string().unique(),
    birthdate: p.datetime(),
    idDocument: p.string().unique(),
  },
});

export class User extends UserSchema.class {}

UserSchema.setClass(User);

import { defineEntity, p } from '@mikro-orm/core';

const UserSchema = defineEntity({
  name: 'User',
  tableName: 'users',
  properties: {
    id: p.integer().primary().autoincrement(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime().onCreate(() => new Date()).onUpdate(() => new Date()),
    name: p.string(),
    email: p.string().unique(),
    birthdate: p.datetime(),
    idDocument: p.string().unique(),
  },
});

export class User extends UserSchema.class {}

UserSchema.setClass(User);

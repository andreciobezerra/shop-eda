import { defineEntity, t } from "@mikro-orm/core";

export const BaseEntitySchema = defineEntity({
  name: "BaseEntity",
  abstract: true,
  properties: {
    id: {
      primary: true,
      type: t.integer,
      autoincrement: true,
    },
    createdAt: {
      type: t.datetime,
      onCreate: () => new Date(),
    },
    updatedAt: {
      type: t.datetime,
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
  },
});

export class BaseEntity extends BaseEntitySchema.class {}

BaseEntitySchema.setClass(BaseEntity);

import { defineEntity, t } from '@mikro-orm/core';

export abstract class BaseEntity {
  id!: number;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}

export const BaseEntitySchema = defineEntity({
  name: 'BaseEntity',
  abstract: true,
  properties: {
    id: {
      primary: true,
      type: t.integer,
      autoincrement: true,
    },
    createdAt: {
      type: t.date,
      onCreate: () => new Date(),
    },
    updatedAt: {
      type: t.date,
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
  },
});

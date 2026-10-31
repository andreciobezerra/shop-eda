import {
  EntityManager,
  EntityName,
  FilterQuery,
  RequiredEntityData,
} from "@mikro-orm/core";
import { BaseEntity } from "../../entities/base.entity";

export abstract class MikroOrmCrudRepository<T extends BaseEntity> {
  constructor(
    protected readonly em: EntityManager,
    protected readonly entityName: EntityName<T>,
  ) {}

  async find(id: number | string): Promise<T | null> {
    return this.em.findOne(this.entityName, { id } as FilterQuery<T>);
  }

  async findAll(
    filters: FilterQuery<T> = {} as FilterQuery<T>,
    limit: number = 10,
    offset: number = 0,
  ): Promise<T[]> {
    return this.em.find(this.entityName, filters, { limit, offset });
  }

  async create(data: RequiredEntityData<T>): Promise<T> {
    const entity = this.em.create(this.entityName, data);
    await this.em.persist(entity).flush();

    return entity;
  }

  async update(id: number | string, data: Partial<T>): Promise<T | null> {
    const entity = await this.find(id);

    if (!entity) {
      return null;
    }

    this.em.assign(entity, data as any);
    await this.em.flush();

    return entity;
  }

  async delete(id: number | string): Promise<boolean> {
    const entity = await this.find(id);

    if (!entity) {
      return false;
    }

    await this.em.remove(entity).flush();

    return true;
  }
}

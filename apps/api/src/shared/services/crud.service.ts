import { BaseEntity } from "../entities/base.entity";
import { CrudRepository } from "../repositories/crud.repository";
import { FilterQuery, RequiredEntityData } from "@mikro-orm/core";

export abstract class CrudService<T extends BaseEntity> {
  constructor(protected readonly crudRepository: CrudRepository<T>) {}

  async find(id: number | string): Promise<T | null> {
    return this.crudRepository.find(id);
  }

  async findAll(
    filters: FilterQuery<T> = {} as FilterQuery<T>,
    limit: number = 10,
    offset: number = 0,
  ): Promise<T[]> {
    return this.crudRepository.findAll(filters, limit, offset);
  }

  async create(data: RequiredEntityData<T>): Promise<T> {
    return this.crudRepository.create(data);
  }

  async update(id: number | string, data: Partial<T>): Promise<T | null> {
    return this.crudRepository.update(id, data);
  }

  async delete(id: number | string): Promise<boolean> {
    return this.crudRepository.delete(id);
  }
}

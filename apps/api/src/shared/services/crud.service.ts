import { CrudRepository } from "../repositories/crud.repository";
import { EntityModel } from "../domain/entity.model";
import { IDto, UpdatedDto } from "../dtos/dto.interface";
import { IMapper } from "../mappers/mapper.interface";

export abstract class CrudService<
  T extends EntityModel,
  D extends IDto<T>,
  C,
  U extends UpdatedDto<T>,
> {
  constructor(
    protected readonly repository: CrudRepository<T, C, U>,
    protected readonly mapper: IMapper<T, D>,
  ) {}

  async find(id: number | string): Promise<D | null> {
    const entity = await this.repository.find(id);

    return entity ? this.mapper.fromEntity(entity) : null;
  }

  async findAll(
    filters: Partial<T> = {},
    limit: number = 10,
    offset: number = 0,
  ): Promise<D[]> {
    const entities = await this.repository.findAll(filters, limit, offset);

    return this.mapper.fromEntities(entities);
  }

  async create(data: C): Promise<D> {
    const entity = await this.repository.create(data);

    return this.mapper.fromEntity(entity);
  }

  async update(id: number | string, data: U): Promise<D | null> {
    const entity = await this.repository.update(id, data);

    return entity ? this.mapper.fromEntity(entity) : null;
  }

  async delete(id: number | string): Promise<boolean> {
    return this.repository.delete(id);
  }
}

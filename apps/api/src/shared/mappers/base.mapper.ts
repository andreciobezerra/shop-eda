import { EntityModel } from "../domain/entity.model";
import { IDto } from "../interfaces/dto.interface";
import { IMapper } from "../interfaces/mapper.interface";

export abstract class BaseMapper<
  T extends EntityModel,
  D extends IDto<T>,
> implements IMapper<T, D> {
  abstract fromEntity(entity: T): D;

  fromEntities(entities: T[]): D[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}

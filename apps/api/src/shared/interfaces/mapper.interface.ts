import { EntityModel } from "../domain/entity.model";
import { IDto } from "./dto.interface";

export interface IMapper<T extends EntityModel, D extends IDto<T>> {
  fromEntity(entity: T): D;
  fromEntities(entities: T[]): D[];
}

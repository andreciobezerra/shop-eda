import { EntityModel } from "../domain/entity.model";

export interface IDto<T extends EntityModel> {
  toEntity(): T;
}

export type Dto<T extends EntityModel> = T & IDto<T>;

export type UpdatedDto<T extends EntityModel> = Partial<T>;

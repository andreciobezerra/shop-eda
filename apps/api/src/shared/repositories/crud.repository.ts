import { EntityModel } from "./entity.model";

/**
 * Persistence-agnostic CRUD contract used by application services.
 *
 * Implementations live in the infrastructure layer and translate these
 * operations to a specific storage technology.
 *
 * @template T Domain model returned by the repository.
 * @template C Input accepted when creating a record.
 * @template U Input accepted when updating a record.
 */
export interface CrudRepository<T extends EntityModel, C, U> {
  /**
   * Finds a single record by its identifier.
   *
   * @param id Record identifier.
   * @returns The matching domain model, or `null` when not found.
   */
  find(id: number | string): Promise<T | null>;

  /**
   * Finds records matching optional filters.
   *
   * @param filters Partial domain model used as filter criteria.
   * @param limit Maximum number of records to return.
   * @param offset Number of records to skip.
   * @returns Matching domain models.
   */
  findAll(filters?: Partial<T>, limit?: number, offset?: number): Promise<T[]>;

  /**
   * Creates a new record.
   *
   * @param data Create input.
   * @returns The created domain model.
   */
  create(data: C): Promise<T>;

  /**
   * Updates an existing record.
   *
   * @param id Record identifier.
   * @param data Update input.
   * @returns The updated domain model, or `null` when not found.
   */
  update(id: number | string, data: U): Promise<T | null>;

  /**
   * Deletes an existing record.
   *
   * @param id Record identifier.
   * @returns `true` when deleted, `false` when not found.
   */
  delete(id: number | string): Promise<boolean>;
}

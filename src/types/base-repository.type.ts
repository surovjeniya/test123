export abstract class AbstractRepository<T> {
  abstract findOne(): Promise<T>;
  abstract update(): Promise<T>;
}

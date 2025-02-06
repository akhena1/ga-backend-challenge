export abstract class IUserRepository<T = any> {
  abstract create(data: Partial<T>): Promise<{ id: string }>;
  abstract findOneById(id: string): Promise<T>;
  abstract findOneByEmail(email: string): Promise<T>;
  abstract findAll(): Promise<T>;
  abstract updateUser(id: string, data: Partial<T>): any;
  abstract deleteUser(id: string): any;
}

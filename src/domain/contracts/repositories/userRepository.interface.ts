import { User } from '../../entities/user';

export abstract class IUserRepository<T = any> {
  abstract create(data: Partial<User>): Promise<{ id: string }>;
  abstract findOneByEmail(email: string): Promise<T>;
  abstract findAll(): Promise<T>;
}

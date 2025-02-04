import { User } from '../../entities/user';

export abstract class IUserRepository {
  abstract create(data: Partial<User>): Promise<{ id: string }>;
  abstract findOneByEmail(id: string);
}

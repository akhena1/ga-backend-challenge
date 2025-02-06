import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';
import { UserEntity } from '../../graphql/entities/user.entity';
import { CreateUserInput } from '../../graphql/resolvers/user/mutations/createUser/inputs/createUser.input';
import { instanceToPlain } from 'class-transformer';
import { User } from '../../../domain/entities/user';

@Injectable()
export class UserRepository
  implements IUserRepository<UserEntity | UserEntity[]>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(params: CreateUserInput): Promise<{ id: string }> {
    const newUser = await this.repository.insert(params);

    return {
      id: newUser.identifiers[0].id,
    };
  }

  async findOneById(id: string): Promise<UserEntity> {
    return await this.repository.findOneBy({
      id,
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOneBy({
      email,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.repository.find();
    const plainUsers = instanceToPlain(users);
    return plainUsers as UserEntity[];
  }

  async updateUser(criteria: unknown, data: Partial<User>) {
    await this.repository.update(criteria, data);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';
import { UserEntity } from '../../graphql/entities/user.entity';
import { CreateUserInput } from '../../graphql/resolvers/user/mutations/createUser/inputs/createUser.input';
import { instanceToPlain } from 'class-transformer';

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
    const user = await this.repository.findOne({
      where: { id },
      relations: ['addresses', 'purchases'],
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['addresses', 'purchases'],
    });

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.repository.find({
      relations: ['addresses', 'purchases'],
    });
    const plainUsers = instanceToPlain(users);
    return plainUsers as UserEntity[];
  }

  async updateUser(id: string, data: Partial<UserEntity>) {
    await this.repository.update(id, data);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ id });
  }
}

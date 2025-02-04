import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';
import { UserEntity } from '../../graphql/entities/user.entity';
import { CreateUserInput } from '../../graphql/resolvers/user/mutations/createUser/inputs/createUser.input';

@Injectable()
export class UserRepository implements IUserRepository {
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

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOneBy({
      email,
    });
  }
}

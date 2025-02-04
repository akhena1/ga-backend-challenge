import { Module } from '@nestjs/common';
import { UserRepository } from '../../../database/repository/user.repository';
import { UserQuery } from './queries/user-query.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../../../domain/contracts/repositories/userRepository.interface';
import { UserMutation } from './mutations/user-mutation.resolver';
import { CreateUser } from '../../../../application/use-cases/createUser';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    UserMutation,
    UserQuery,
    CreateUser,
    UserRepository,
  ],
})
export class UserModule {}

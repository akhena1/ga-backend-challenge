import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUser } from '../../../../application/use-cases/user/createUser';
import { IUserRepository } from '../../../../domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../database/repository/user.repository';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserResolver } from './mutations/createUser/createUser.resolver';
import { UserQuery } from './queries/getUser.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    CreateUserResolver,
    UserQuery,
    CreateUser,
    UserRepository,
  ],
})
export class UserModule {}

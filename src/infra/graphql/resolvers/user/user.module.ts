import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUser } from '../../../../application/use-cases/user/createUser';
import { IUserRepository } from '../../../../domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../database/repository/user.repository';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserResolver } from './mutations/createUser/createUser.resolver';
import { UserQuery } from './queries/getUsers.resolver';
import { GetUsers } from 'src/application/use-cases/user/getUsers';
import { GetUserByEmail } from 'src/application/use-cases/user/getUserByEmail';

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
    GetUsers,
    GetUserByEmail,
    UserRepository,
  ],
})
export class UserModule {}

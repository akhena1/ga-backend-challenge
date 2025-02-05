import 'dotenv';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserRepository } from '../../../domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../database/repository/user.repository';
import { UserEntity } from '../../graphql/entities/user.entity';
import { LoginResolver } from '../../graphql/resolvers/user/mutations/login/login.resolver';
import { AuthService } from './auth';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService,
    UserRepository,
    LoginResolver,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    UserRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}

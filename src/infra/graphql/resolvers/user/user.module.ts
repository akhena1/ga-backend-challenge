import { Module } from '@nestjs/common';
import { UserProvider } from '../../../repository/user.repository';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserProvider, UserResolver],
})
export class UserModule {}

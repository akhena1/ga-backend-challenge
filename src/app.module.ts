import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './infra/graphql/resolvers/user/user.module';
import { AuthModule } from './infra/providers/auth/auth.module';
import { ProvidersModule } from './infra/providers/providers.module';
import { AddressModule } from './infra/graphql/resolvers/address/address.module';
import { PurchaseModule } from './infra/graphql/resolvers/purchase/purchase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ga-db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AuthModule,
    ProvidersModule,
    UserModule,
    AddressModule,
    PurchaseModule
  ],
})
export class AppModule {}

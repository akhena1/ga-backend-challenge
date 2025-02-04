import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './infra/graphql/resolvers/user/user.module';
import { ProvidersModule } from './infra/providers/providers.module';

@Module({
  imports: [
    ProvidersModule,
    UserModule,
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
  ],
})
export class AppModule {}

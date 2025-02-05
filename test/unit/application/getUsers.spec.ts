import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { ErrorMessages } from '../../../src/domain/contracts/base/baseMessages';
import { IUserRepository } from '../../../src/domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../src/infra/database/repository/user.repository';
import { UserEntity } from '../../../src/infra/graphql/entities/user.entity';
import { GetUsers } from '../../../src/application/use-cases/user/getUsers';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Get Users', () => {
      let app: INestApplication;
      let getUsersUseCase: GetUsers;
      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            GetUsers,
            { provide: IUserRepository, useValue: userRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        getUsersUseCase = app.get(GetUsers);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should successfully return users', async () => {
        // Given
        const users: UserEntity[] = [
          {
            id: '1',
            email: 'email@123.com',
            name: 'Nome',
            password: 'hashedPass',
          },
          {
            id: '2',
            email: 'email2@123.com',
            name: 'Nome',
            password: 'hashedPass',
          },
        ];

        // When
        userRepositoryStub.findAll.resolves(users);
        const usecase = await getUsersUseCase.execute();

        // Then
        expect(usecase).toBe(users);
      });

      it('Should return error when does not exists users in database or typeorm fail', async () => {
        // Given
        const users = undefined;

        // When
        userRepositoryStub.findAll.resolves(users);
        const usecase = await getUsersUseCase.execute();

        // Then
        expect(usecase.message).toBe(ErrorMessages.userNotFound);
      });
    });
  });
});

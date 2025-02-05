import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { GetUserByEmail } from '../../../src/application/use-cases/user/getUserByEmail';
import { ErrorMessages } from '../../../src/domain/contracts/base/baseMessages';
import { IUserRepository } from '../../../src/domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../src/infra/database/repository/user.repository';
import { UserEntity } from '../../../src/infra/graphql/entities/user.entity';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Get Users By Email', () => {
      let app: INestApplication;
      let getUserByEmailUseCase: GetUserByEmail;
      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            GetUserByEmail,
            { provide: IUserRepository, useValue: userRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        getUserByEmailUseCase = app.get(GetUserByEmail);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should successfully return user when email exist in db', async () => {
        // Given
        const email = 'teste@email.com';
        const user: UserEntity = {
          id: '1',
          email,
          name: 'Nome',
          password: 'hashedPass',
        };

        // When
        userRepositoryStub.findOneByEmail.resolves(user);
        const usecase = await getUserByEmailUseCase.execute(email);

        // Then
        expect(usecase).toBe(user);
      });

      it('Should return error when user does not exists', async () => {
        // Given
        const email = 'teste@email.com';
        const users = undefined;

        // When
        userRepositoryStub.findOneByEmail.resolves(users);
        const usecase = await getUserByEmailUseCase.execute(email);

        // Then
        expect(usecase.message).toBe(ErrorMessages.userNotFound);
      });
    });
  });
});

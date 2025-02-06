import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import { GetAddressesByUserId } from '../../../../src/application/use-cases/address/getAddressByUserId';
import { ErrorMessages } from '../../../../src/domain/contracts/base/baseMessages';
import { IAddressRepository } from '../../../../src/domain/contracts/repositories/addressRepository.inteface';
import { IUserRepository } from '../../../../src/domain/contracts/repositories/userRepository.interface';
import { AddressRepository } from '../../../../src/infra/database/repository/address.repository';
import { UserRepository } from '../../../../src/infra/database/repository/user.repository';
import { UserEntity } from '../../../../src/infra/graphql/entities/user.entity';
import { AddressEntity } from 'src/infra/graphql/entities/address.entity';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Get Addresses By User', () => {
      let app: INestApplication;
      let getAddressesByUserUseCase: GetAddressesByUserId;
      const addressRepositoryStub = sinon.createStubInstance(AddressRepository);

      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            GetAddressesByUserId,
            { provide: IUserRepository, useValue: userRepositoryStub },
            { provide: IAddressRepository, useValue: addressRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        getAddressesByUserUseCase = app.get(GetAddressesByUserId);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should successfully return addresses when userId exists', async () => {
        // Given
        const id = uuid()
        const user: UserEntity = {
          id,
          email: 'teste@email.com',
          name: 'Nome',
          password: 'hashedPass',
        };

        const addresses = [
            {
                street: "RUA",
                number: 1200,
                city: "POÁ",
                state: "SAO PAULO",
                zipCode: "08673-220",
              },
              {
                street: "RUA  2",
                number: 12300,
                city: "SUZANO",
                state: "SAO PAULO",
                zipCode: "08551-2120",
              },
              
        ] as AddressEntity[]

        // When
        userRepositoryStub.findOneById.resolves(user);
        addressRepositoryStub.findByUserId.resolves(addresses)
        const usecase = await getAddressesByUserUseCase.execute(id);

        // Then
        expect(usecase).toBe(addresses);
      });

      it('Should return error when userId does not exists', async () => {
        // Given
        const email = 'teste@email.com';

        // When
        userRepositoryStub.findOneById.resolves(false);
        const usecase = await getAddressesByUserUseCase.execute(email);

        // Then
        expect(usecase.message).toBe(ErrorMessages.userNotFound);
      });

      it('Should return an empty array when user does not have any address', async () => {
        // Given
        const id = uuid()
        const user: UserEntity = {
          id,
          email: 'teste@email.com',
          name: 'Nome',
          password: 'hashedPass',
        };
        const addresses = []
        // When
        userRepositoryStub.findOneById.resolves(user);
        addressRepositoryStub.findByUserId.resolves(addresses)
        const usecase = await getAddressesByUserUseCase.execute(id);

        // Then
        expect(usecase).toBe(addresses);
      });
    });
  });
});

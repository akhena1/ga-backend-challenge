import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../../src/domain/contracts/base/baseMessages';
import { IUserRepository } from '../../../../src/domain/contracts/repositories/userRepository.interface';
import { UserRepository } from '../../../../src/infra/database/repository/user.repository';
import { UserEntity } from '../../../../src/infra/graphql/entities/user.entity';
import { CreateAddress } from '../../../../src/application/use-cases/address/createAddress';
import { IAddressRepository } from '../../../../src/domain/contracts/repositories/addressRepository.inteface';
import { AddressRepository } from '../../../../src/infra/database/repository/address.repository';
import { CreateAddressInput } from '../../../../src/infra/graphql/resolvers/address/mutations/createAddress/inputs/createAddress.input';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Create Address', () => {
      let app: INestApplication;
      let createAddressUseCase: CreateAddress;
      const addressRepositoryStub = sinon.createStubInstance(AddressRepository);
      const userRepositoryStub =
        sinon.createStubInstance<IUserRepository>(UserRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            CreateAddress,
            { provide: IUserRepository, useValue: userRepositoryStub },
            { provide: IAddressRepository, useValue: addressRepositoryStub },

          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        createAddressUseCase = app.get(CreateAddress);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should successfully create an address', async () => {
        // Given
        const addressId = uuid();
        const userId = uuid()
        const address: CreateAddressInput = {
          street: "RUA",
          number: 1200,
          city: "POÁ",
          state: "SAO PAULO",
          zipCode: "08673-220",
          userId
        };

        // When
        userRepositoryStub.findOneById.resolves(true);
        addressRepositoryStub.create.resolves({ id: addressId })
        const usecase = await createAddressUseCase.execute(address);

        // Then
        expect(usecase.message).toBe(SuccessMessages.addressCreated);
        expect(usecase.data).toHaveProperty('id');
        expect(usecase.data.id).toBe(addressId);
      });

      it('Should throw an error when userId does not exists', async () => {
        // Given
        const addressId = uuid();
        const userId = uuid()
        const address: CreateAddressInput = {
          street: "RUA",
          number: 1200,
          city: "POÁ",
          state: "SAO PAULO",
          zipCode: "08673-220",
          userId
        };

        // When
        userRepositoryStub.findOneById.resolves(false);
        addressRepositoryStub.create.resolves({ id: addressId })
        const usecase = await createAddressUseCase.execute(address);

        // Then
        expect(usecase.message).toBe(ErrorMessages.userNotFound);
      });
    });
  });
});

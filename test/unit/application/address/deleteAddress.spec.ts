import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { AddressEntity } from '../../../../src/infra/graphql/entities/address.entity';
import { v1 as uuid } from 'uuid';
import { DeleteAddress } from '../../../../src/application/use-cases/address/deleteAddress';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../../src/domain/contracts/base/baseMessages';
import { IAddressRepository } from '../../../../src/domain/contracts/repositories/addressRepository.inteface';
import { AddressRepository } from '../../../../src/infra/database/repository/address.repository';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Delete Address', () => {
      let app: INestApplication;
      let deleteAddressUseCase: DeleteAddress;
      const addressRepositoryStub = sinon.createStubInstance(AddressRepository);

      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            DeleteAddress,
            { provide: IAddressRepository, useValue: addressRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        deleteAddressUseCase = app.get(DeleteAddress);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should delete a address when he exists', async () => {
        // Given
        const id = uuid();
        const address = {
          street: 'RUA',
          number: 1200,
          city: 'POÁ',
          state: 'SAO PAULO',
          zipCode: '08673-220',
        } as AddressEntity;

        // When
        addressRepositoryStub.findOneById.resolves(address);
        const usecase = await deleteAddressUseCase.execute({ id });

        // Then
        expect(usecase.message).toBe(SuccessMessages.addressDeleted);
      });

      it('Should throw an error when address do not exists', async () => {
        // Given
        const id = uuid();

        // When
        addressRepositoryStub.findOneById.resolves(null);
        const usecase = await deleteAddressUseCase.execute({ id });

        // Then
        expect(usecase.message).toBe(ErrorMessages.addressNotFound);
      });
    });
  });
});

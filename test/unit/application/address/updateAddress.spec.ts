import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { v1 as uuid } from 'uuid';
import {
  ErrorMessages,
  SuccessMessages,
} from '../../../../src/domain/contracts/base/baseMessages';
import { UpdateAddress } from '../../../../src/application/use-cases/address/updateAddress';
import { AddressRepository } from '../../../../src/infra/database/repository/address.repository';
import { AddressEntity } from '../../../../src/infra/graphql/entities/address.entity';
import { IAddressRepository } from '../../../../src/domain/contracts/repositories/addressRepository.inteface';

describe('Unit tests', () => {
  describe('Application', () => {
    describe('Update Address', () => {
      let app: INestApplication;
      let updateAddressUseCase: UpdateAddress;
      const addressRepositoryStub = sinon.createStubInstance(AddressRepository);


      beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
          providers: [
            UpdateAddress,
            { provide: IAddressRepository, useValue: addressRepositoryStub },
          ],
        }).compile();

        app = moduleFixture.createNestApplication();
        updateAddressUseCase = app.get(UpdateAddress);
        await app.init();
      });

      afterAll(async () => {
        await app.close();
      });

      it('Should update a address when he exists', async () => {
        // Given
        const id = uuid();
        const address = {
          street: "RUA",
          number: 1200,
          city: "POÁ",
          state: "SAO PAULO",
          zipCode: "08673-220",
        } as AddressEntity

        // When
        addressRepositoryStub.findOneById.resolves(address)
        addressRepositoryStub.updateAddress.resolves()
        const usecase = await updateAddressUseCase.execute({ id, data: address });

        // Then
        expect(usecase.message).toBe(SuccessMessages.addressUpdated);
      });

      it('Should throw an error when address do not exists', async () => {
        // Given
        const id = uuid();
        const address = {
          street: "RUA",
          number: 1200,
          city: "POÁ",
          state: "SAO PAULO",
          zipCode: "08673-220",
        } as AddressEntity

        // When
        addressRepositoryStub.findOneById.resolves(null)
        const usecase = await updateAddressUseCase.execute({ id, data: address });

        // Then
        expect(usecase.message).toBe(ErrorMessages.addressNotFound);
      });
    });
  });
});

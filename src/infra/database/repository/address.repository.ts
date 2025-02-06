import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AddressEntity } from '../../graphql/entities/address.entity';
import { UserEntity } from '../../graphql/entities/user.entity';
import { instanceToPlain } from 'class-transformer';
import { IAddressRepository } from '../../../domain/contracts/repositories/addressRepository.inteface';

@Injectable()
export class AddressRepository
  implements IAddressRepository<AddressEntity | AddressEntity[]>
{
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repository: Repository<AddressEntity>,
  ) {}

  async create(params: {
    userId: string;
    data: AddressEntity;
  }): Promise<{ id: string }> {
    const newAddressQuery = this.repository.create({
      ...params.data,
      user: { id: params.userId } as UserEntity,
    });

    return await this.repository.save(newAddressQuery);
  }

  async findByUserId(id: string): Promise<AddressEntity[]> {
    const addresses = await this.repository.findBy({
      user: { id },
    });

    const plainAddresses = instanceToPlain(addresses);

    return plainAddresses as AddressEntity[];
  }

  async findOneById(id: string): Promise<AddressEntity | AddressEntity[]> {
    return await this.repository.findOneBy({ id });
  }

  async updateAddress(id: string, data: Partial<AddressEntity>) {
    await this.repository.update(id, data);
  }

  async deleteAddress(id: string): Promise<DeleteResult> {
    throw new NotImplementedException('id', id);
  }
}

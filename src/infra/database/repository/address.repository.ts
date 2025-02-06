import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AddressEntity } from '../../graphql/entities/address.entity';
import { UserEntity } from '../../graphql/entities/user.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
//   implements IAddressRepository<AddressEntity | AddressEntity[]>
export class AddressRepository {
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

    const plainAddresses = instanceToPlain(addresses)

    return plainAddresses as AddressEntity[]
  }

  //   async findOneByEmail(email: string): Promise<UserEntity> {
  //     return await this.repository.findOneBy({
  //       email,
  //     });
  //   }

  //   async findAll(): Promise<UserEntity[]> {
  //     const users = await this.repository.find();
  //     const plainUsers = instanceToPlain(users);
  //     return plainUsers as UserEntity[];
  //   }

  //   async updateUser(criteria: unknown, data: Partial<User>) {
  //     await this.repository.update(criteria, data);
  //   }

  //   async deleteUser(id: string): Promise<DeleteResult> {
  //     return await this.repository.delete({ id });
  //   }
}

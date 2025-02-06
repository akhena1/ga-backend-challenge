import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AddressEntity } from '../../graphql/entities/address.entity';
import { UserEntity } from 'src/infra/graphql/entities/user.entity';

@Injectable()
export class AddressRepository
//   implements IAddressRepository<AddressEntity | AddressEntity[]>
{
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repository: Repository<AddressEntity>,
  ) {}

  async create(params: {userId: string, data: AddressEntity}): Promise<{ id: string }> {
    const newAddressQuery =  this.repository.create({
        ...params.data,
        user: { id: params.userId } as UserEntity
    })
    
    return await this.repository.save(newAddressQuery);
  }

//   async findOneById(id: string): Promise<UserEntity> {
//     return await this.repository.findOneBy({
//       id,
//     });
//   }

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

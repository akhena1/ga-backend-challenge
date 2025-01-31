import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProvider {
  findOneById(id: number) {
    return {
      id,
      firstName: 'Hello World! :D',
    };
  }
}

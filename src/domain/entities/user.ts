import { Address } from './address';
import { Purchase } from './purchase';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  addresses?: Address[];
  purchases?: Purchase[];
}

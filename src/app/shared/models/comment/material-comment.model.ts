import {User} from '../user/user.model';

export class MaterialComment {
  id: number;
  auto_date: string;
  text: string;
  user: User;
}

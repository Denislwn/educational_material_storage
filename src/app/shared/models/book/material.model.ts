import {User} from '../user/user.model';
import {Category} from '../category/category.model';

export class Material {
  id: number;
  auto_date: string;
  owner: User;
  name: string;
  author: string;
  file: string;
  type: number;
  deleted: boolean;
  categories: Category[];
  elected: boolean;
}

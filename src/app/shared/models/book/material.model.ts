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
  extension: string;
  deleted: boolean;
  categories: Category[];
  quick_toolbar: boolean;
  elected: boolean;
}

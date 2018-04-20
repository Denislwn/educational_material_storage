import {User} from '../user.model';
import {Category} from '../category/category.model';

export class Book {
  id: number;
  owner: User;
  categories: Category[];
  file: string;
  auto_date: string;
  name: string;
  author: string;
  deleted: boolean;
  elected: boolean;
}

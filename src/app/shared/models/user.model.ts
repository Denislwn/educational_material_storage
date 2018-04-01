export class User {
  id: number;
  role: number;
  username: string;
  last_name: string;
  first_name: string;
  email: string;
  token: string;
  blocked: boolean;
  books: Object[];
}

// {
//   "role": 0,
//   "last_name": "Харламов",
//   "blocked": false,
//   "id": 1,
//   "email": "den@mail.ru",
//   "username": "denislwn",
//   "token": "b739322ff9c7f019d3cd0a840457fba1ed0362b3",
//   "first_name": "Денис",
//   "books": []
// }

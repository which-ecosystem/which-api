interface User {
  info : {
    name: string;
    age: number;
    nationality: string;
    sex: string;
  }
}

export class UserService {
  users: User[] = [];

  async find (){
    return this.users;
  }

  async create(data: Pick<User, 'info'>){
    const user: User = {...data};
    this.users.push(user);
    return user;
  }
}
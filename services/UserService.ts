interface User {
  name: string;
  avatarUrl?: string;
  age?: number;
}

export class UserService {
  users: User[] = [];

  async find (){
    return this.users;
  }

  async create(data: Pick<User, 'name' | 'avatarUrl' | 'age'>){
    const user: User = { ...data };
    this.users.push(user);
    return user;
  }
}


import { User } from '../types/user.types';

export class UserRepository {
  private static users: User[] = [];

  async create(user: User): Promise<User> {
    UserRepository.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return UserRepository.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return UserRepository.users.find(user => user.id === id);
  }
}

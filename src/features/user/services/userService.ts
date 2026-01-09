import { UserRepository } from '../repositories/userRepository';
import { CreateUserDTO } from '../dtos/createUserDTO';
import { User } from '../types/user.types';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export class UserService {
  constructor(private userRepository = new UserRepository()) {}

  async createUser(data: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await this.userRepository.create(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/userRepository';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: CreateUserInput) {
    const email = data.email.trim().toLowerCase();

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new Error('User already exists');
    }

    // 🔐 hash obrigatório da senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      name: data.name.trim(),
      email,
      password: hashedPassword,
    });

    // nunca retornar senha
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

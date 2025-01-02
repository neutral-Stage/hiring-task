import { UserEntity } from "../entities/user.entity";
import { AppDataSouce } from "../db";

class UserService {
  private userRepository = AppDataSouce.getRepository(UserEntity);

  async createUser(userData: Partial<UserEntity>) {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async getOneUser(where: Partial<UserEntity>) {
    return await this.userRepository.findOne({ where });
  }

  // ... other user methods
}

export const userService = new UserService();

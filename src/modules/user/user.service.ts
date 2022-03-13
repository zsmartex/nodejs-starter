import { getCustomRepository, getMongoManager } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';

export class UserService {
  userRepository = getCustomRepository(UserRepository);

  manager = getMongoManager();

  async create(user_dto: UserDto) {
    const user = this.userRepository.create(user_dto);
    return this.manager.save(user);
  }
}

import { MongoBulkWriteError } from 'mongodb';
import { getCustomRepository, getMongoManager } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

function ErrorHandler(error: MongoBulkWriteError) {
  switch (error.code) {
    case 11000:
      return 'trung lap';
    default:
      return 'unknown error';
  }
}

export class UserService {
  userRepository = getCustomRepository(UserRepository);

  manager = getMongoManager();

  async create(user_dto: UserDto) {
    const user = this.userRepository.create(user_dto);
    try {
      await this.manager.save(user);
    } catch (error: any) {
      ErrorHandler(error);
    }
  }
}

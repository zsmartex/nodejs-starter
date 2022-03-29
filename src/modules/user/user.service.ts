import { MongoBulkWriteError } from 'mongodb';
import { getCustomRepository, getMongoManager } from 'typeorm';
import { CreateUserDto } from './dtos/user.dto';
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

  async findOne(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(create_user_dto: CreateUserDto) {
    const user = this.userRepository.create(create_user_dto);
    try {
      return await this.manager.save(user);
    } catch (error: any) {
      return ErrorHandler(error);
    }
  }
}

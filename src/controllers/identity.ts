import {
  Body, Controller, Delete, Flow, Post, Session,
} from 'amala';
import type { Session as ISession } from 'koa-session';
import { UserEntity } from '../modules/user/user.entity';
import { UserService } from '../modules/user/user.service';
import { CreateUserDto, UserLoginDto } from '../modules/user/dtos/user.dto';
import { GuestOnly, MustAuth } from './middleware';

@Controller('/identity')
export default class IdentityController {
  // Create a new user
  @Post('/users')
  @Flow([GuestOnly])
  async Register(@Body() body: CreateUserDto) {
    const userService = new UserService();

    try {
      const user = await userService.create(body) as UserEntity;

      return user.toJSON();
    } catch (error) {
      return error;
    }
  }

  // Create a new session
  @Post('/session')
  @Flow([GuestOnly])
  async Login(@Body() body: UserLoginDto, @Session() session: ISession) {
    const userService = new UserService();
    try {
      const user = await userService.findOne(body.email) as UserEntity;

      if (!user.comparePassword(body.password)) {
        return 'Sai mat khau';
      }

      session.email = user.email;
      session.save();

      return user.toJSON();
    } catch (error) {
      return 'Khong tim thay user';
    }
  }

  // Delete current session
  @Delete('/session')
  @Flow([MustAuth])
  async Logout(@Session() session: ISession) {
    const userService = new UserService();
    try {
      await userService.findOne(session.email) as UserEntity;

      session.email = undefined;
      session.save();
      return 'Thanh cong';
    } catch (error) {
      return 'Khong tim thay session';
    }
  }
}

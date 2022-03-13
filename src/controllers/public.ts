import {
  Body, Controller, Get, Post,
} from 'amala';
import { UserService } from '../modules/user/user.service';
import { UserDto } from '../modules/user/dtos/user.dto';

@Controller('/public')
export default class PublicController {
  @Get('/timestamp')
  getTimestamp() {
    return new Date().toISOString();
  }

  @Post('/test')
  async test(@Body() body: UserDto) {
    const userService = new UserService();

    return userService.create(body);
  }
}

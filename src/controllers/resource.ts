import {
  Controller, Flow, Get, State,
} from 'amala';
import { UserEntity } from '../modules/user/user.entity';
import { MustAuth } from './middleware';

@Controller('/resource')
export default class ResourceController {
  @Get('/me')
  @Flow([MustAuth])
  getCurrentUser(@State() state: { user: UserEntity }) {
    return state.user.toJSON();
  }
}

import {
  Controller, Get,
} from 'amala';

@Controller('/public')
export default class PublicController {
  @Get('/timestamp')
  getTimestamp() {
    return new Date().toISOString();
  }
}

import type Koa from 'koa';
import { Session } from 'koa-session';
import { UserService } from '../modules/user/user.service';

export function GuestOnly(ctx: Koa.ParameterizedContext, next: Koa.Next) {
  if (ctx.session?.email) {
    ctx.response.body = 'Đã đăng nhập';
    return;
  }

  return next();
}

export async function MustAuth(ctx: Koa.ParameterizedContext, next: Koa.Next) {
  if (!ctx.session?.email) {
    ctx.response.body = 'Chưa đăng nhập';
    return;
  }

  const session = ctx.session as Session;
  const userService = new UserService();

  try {
    const user = await userService.findOne(session.email);

    ctx.state.user = user;

    return next();
  } catch (error) {
    ctx.response.body = 'Không tìm thấy user';
  }
}

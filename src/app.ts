// import Koa from 'koa';
// import bodyParser from 'koa-bodyparser';
// import cors from '@koa/cors';
// import helmet from 'koa-helmet';
// import json from 'koa-json';
// import logger from 'koa-logger';
// import 'reflect-metadata';
// import router from './server';

// const app = new Koa();
// const port = process.env.PORT || 3000;

// app.use(helmet());
// app.use(cors());
// app.use(json());
// app.use(logger());
// app.use(bodyParser());

// app.use(router.routes()).use(router.allowedMethods());

// app.listen(port, () => {
//   console.log(`🚀 App listening on the port ${port}`);
// });

import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import json from 'koa-json';
import logger from 'koa-logger';
import session from 'koa-session';
import 'reflect-metadata';
import 'dotenv/config';
import { bootstrapControllers } from 'amala';
import { createConnection } from 'typeorm';
import { UserEntity } from './modules/user/user.entity';

const koaApp = new Koa();
const koarouter = new KoaRouter();

koaApp.keys = ['mysecret'];

const CONFIG = {
  key: 'session_id', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false,
  renew: false,
  secure: false, /** (boolean) secure cookie */
  sameSite: undefined, /** (string) session cookie sameSite options (default null, don't set it) */
};

koaApp.use(session(CONFIG, koaApp));

// eslint-disable-next-line func-names
(async function () {
  const { app, router } = await bootstrapControllers({
    app: koaApp,
    router: koarouter,
    basePath: '/api',
    flow: [], // in order of execution!
    attachRoutes: true,
    versions: [2],
    controllers: [
      `${__dirname}/controllers/**/*.ts`,
    ],
  });

  app.use(helmet());
  app.use(cors());
  app.use(json());
  app.use(logger());
  app.use(bodyParser());

  app.use(router.routes());
  app.use(router.allowedMethods());

  createConnection({
    type: 'mongodb',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    authSource: 'admin',
    synchronize: true,
    logging: true,
    entities: [UserEntity],
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`App is running in port :${port}`);
  });
}());

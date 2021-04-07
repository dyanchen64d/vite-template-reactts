import Koa from 'koa';
import KoaRouter from 'koa-router';
import render from 'koa-ejs';
import path from 'path';

const app = new Koa();
const router = new KoaRouter();

render(app, {
  root: path.join(__dirname, ''),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
});

router.get('/ping', (ctx, next) => {
  ctx.body = 'pong pong';
});

router.get('/', async (ctx, next) => {
  // ctx.type = 'text/html';
  // ctx.body = indexHtml({
  //     NODE_ENV: process.env.NODE_ENV,
  //     scriptUrl: path.join(__dirname, '../../dist/main.js')
  // });
  await ctx.render('index', {
    NODE_ENV: process.env.NODE_ENV,
    scriptUrl: path.join(__dirname, '../../dist/main.js')
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;

import Koa from 'koa';
import KoaRouter from 'koa-router';
import views from 'koa-views';
import path from 'path';
import dovEnv from 'dotenv';
import send from 'koa-send';
import pkgDir from 'pkg-dir';
import fs from 'fs';

const app = new Koa();
const router = new KoaRouter();

const ROOT = pkgDir.sync(__dirname) || '';

dovEnv.config();

const render = views(
  path.join(ROOT, 'server/template'),
  {
    extension: 'html'
  }
);
app.use(render);

router.get('/pingping', (ctx, next) => {
  ctx.body = 'pongpong';
});

router.get('/src/(.*)', async (ctx, next) => {
  await send(ctx, ctx.path);
});

router.get('/', async (ctx, next) => {
  return await ctx.render('index', {
    scriptUrl: '/static/main.js',
  })
});

app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(3030);
console.log('http://localhost:3030');

import Koa from 'koa';
import KoaRouter from 'koa-router';
import views from 'koa-views';
import path from 'path';
import dovEnv from 'dotenv';
import send from 'koa-send';
import pkgDir from 'pkg-dir';
import manifest from '../dist/manifest.json';

const app = new Koa();
const router = new KoaRouter();

const ROOT = pkgDir.sync(__dirname) || '';

dovEnv.config();

const render = views(
  path.join(ROOT, 'server/template'),
  {
    map: {
      html: 'ejs'
    }
  },
);
app.use(render);

router.get('/pingping', (ctx, next) => {
  ctx.body = 'pongpong';
});

router.get('/client/(.*)', async (ctx, next) => {
  await send(ctx, ctx.path);
});

router.get('/dist/(.*)', async (ctx, next) => {
  await send(ctx, ctx.path);
});

// router.get('/assets/(.*)', async (ctx, next) => {
//   await send(ctx, `/dist/${ctx.path}`);
// });

router.get('/', async (ctx, next) => {
  return await ctx.render('index', {
    config: JSON.stringify({
      env: process.env.NODE_ENV // production development
    }),
    env: process.env.NODE_ENV,
    mainJs: `/dist/${manifest['client/main.tsx'].file}`,
    mainCss: `/dist/${manifest['client/main.tsx'].css}`
  })
});

app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(3030);
console.log('http://localhost:3030');

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

const getCssFiles = () => {
  const files = fs.readdirSync(ROOT + '/dist');
  const cssFiles = files.filter(name => name.indexOf('.css') > 0);
  return cssFiles;
}

dovEnv.config();

const render = views(
  path.join(ROOT, 'server/template'),
  {
    extension: 'pug'
  }
);
app.use(render);

router.get('/pingping', (ctx, next) => {
  ctx.body = 'pongpong';
});

router.get('/static/(.*)', async (ctx, next) => {
  const filename = path.basename(ctx.path);
  // console.log('filename', filename);
  await send(ctx, filename, {
    root: path.join(ROOT, '/dist')
  });
});

router.get('/', async (ctx, next) => {
  const cssFiles = getCssFiles();

  return await ctx.render('index.pug', {
    scriptUrl: '/static/main.js',
    cssFiles
  })
});

app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(3003);
console.log('http://localhost:3003');

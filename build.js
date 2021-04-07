const esbuild = require('esbuild');
const dotenv = require('dotenv');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

dotenv.config();

esbuild.build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node14',
    outfile: 'target/index.js',
    sourcemap: 'external',
    plugins: [nodeExternalsPlugin()],
    watch: process.env.NODE_ENV === 'development',
});

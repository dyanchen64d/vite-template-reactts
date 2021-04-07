import app from './app';
import dovEnv from 'dotenv';

dovEnv.config();

app.listen(3003);
console.log('http://localhost:3003/ping');

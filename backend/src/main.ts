import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const fs = require('fs');
  const keyFile  = fs.readFileSync(__dirname + '/../ssl/localhost.key');
  const certFile = fs.readFileSync(__dirname + '/../ssl/localhost.crt');

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    }});
  app.setGlobalPrefix('api');
  await app.listen(443);
}
bootstrap();

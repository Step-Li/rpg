import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import * as http from 'http';
import * as https from 'https';
import * as express from 'express';

async function bootstrap() {
  const fs = require('fs');
  const keyFile  = fs.readFileSync('/etc/letsencrypt/live/rpgkashevar.ru/privkey.pem');
  const certFile = fs.readFileSync('/etc/letsencrypt/live/rpgkashevar.ru/fullchain.pem');

  const httpsOptions = {key: keyFile, cert: certFile};

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.setGlobalPrefix('api');

  await app.init();

  http.createServer(server).listen(80);
  https.createServer(httpsOptions, server).listen(443);
}
bootstrap();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Connection } from 'typeorm';
import { WorksModule } from './modules/works/works.module';

import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot(),
    WorksModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

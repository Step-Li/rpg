
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { Work } from './work.entity';
import { ReviewsModule } from '../reviews/reviews.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Work]),
    ReviewsModule,
  ],
  providers: [WorksService],
  controllers: [WorksController],
  exports: [WorksService],
})
export class WorksModule {}

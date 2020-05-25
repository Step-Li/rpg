
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>,
    ) { }

    async findOne(id: string) {
        return this.reviewsRepository.findOne(id);
    }

    async save(review: Review) {
        return this.reviewsRepository.save(review);
    }

    async delete(id: number) {
        return this.reviewsRepository.delete(id);
    }
}

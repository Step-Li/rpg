import { Controller, Get, Post, Body, HttpException, HttpStatus, Delete, Query, UseInterceptors, UploadedFile, HttpCode, Res, Put, UseGuards } from '@nestjs/common';
import { WorksService } from './works.service';
import { Work } from './work.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

import { translit } from '../../utils/translit';
import { ReviewsService } from '../reviews/reviews.service';
import { parseWork } from '../../utils/parseWork';

@Controller()
export class WorksController {
    constructor(
        private worksService: WorksService,
        private reviewsService: ReviewsService,
    ) {}

    @Get('works')
    async getWorks(): Promise<Work[]> {
        return this.worksService.findAll();
    }

    @Get('work')
    async getWork(@Query() query): Promise<Work> {
        return this.worksService.findOne(query.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('work')
    async delete(@Query() query): Promise<void> {
        const work = await this.worksService.findOne(query.id);
        const filePath = work.filePath;

        work.reviews.forEach(review => this.reviewsService.delete(review.rewiewId))

        await this.worksService.delete(query.id);
        await this.worksService.deleteFile(filePath);
    }

    @UseGuards(JwtAuthGuard)
    @Put('work')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async editWork(@UploadedFile() file, @Body() body): Promise<void> {
        const { errors, work } = parseWork(body);

        if (!body.id) {
            errors.push('не указан id редактируемой работы');
        }

        if (errors.length > 0) {
            throw new HttpException('Неверные параметры работы: ' + errors.join(', '), HttpStatus.BAD_REQUEST);
        }

        const oldWork = await this.worksService.findOne(work.id);
        const newWork: Partial<Work> = {
            ...work,
            filePath: oldWork.filePath,
        }

        if (file) {
            const oldFilePath = oldWork.filePath;
            newWork.filePath = await this.worksService.saveFile(file, body.title, oldFilePath);

            return this.worksService.update(newWork);
        }

        if (oldWork.title !== newWork.title) {
            newWork.filePath = await this.worksService.renameFile(oldWork.filePath, newWork.title);
        }

        return this.worksService.update(newWork);
    }

    @UseGuards(JwtAuthGuard)
    @Post('work')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async insertWork(@UploadedFile() file, @Body() body): Promise<void> {
        const { errors, work } = parseWork(body);
        
        if (errors.length > 0) {
            throw new HttpException('Неверные параметры работы: ' + errors.join(', '), HttpStatus.BAD_REQUEST);
        }

        const filePath = await this.worksService.saveFile(file, body.title);

        return this.worksService.insert({
            ...work,
            filePath,
        });
    }

    @Get('download-file')
    async getFile(@Query() query, @Res() response: Response) {
        const work = await this.worksService.findOne(query.id);
        const buffer = await this.worksService.getFileBuffer(work.filePath);
        const stream = this.worksService.getReadableStream(buffer);

        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=' + translit(work.title) + '.pdf',
            'Content-Length': buffer.length,
        });

        stream.pipe(response);
    }

    @UseGuards(JwtAuthGuard)
    @Post('review')
    async login(@Body() body) {
        const work = await this.worksService.findOne(body.id);
        return this.reviewsService.save({
            text: body.text,
            author: body.author,
            positive: body.positive,
            negative: body.negative,
            work,
        });
    }
}

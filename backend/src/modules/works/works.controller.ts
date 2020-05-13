import { Controller, Get, Post, Body, HttpException, HttpStatus, Delete, Query, UseInterceptors, UploadedFile, HttpCode, Res, Put, UseGuards } from '@nestjs/common';
import { WorksService } from './works.service';
import { Work } from './work.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

import { translit } from '../../utils/translit';

@Controller()
export class WorksController {
    constructor(private worksService: WorksService) {}

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
        const filePath = await (await this.worksService.findOne(query.id)).filePath;

        await this.worksService.remove(query.id);
        await this.worksService.deleteFile(filePath);
    }

    @UseGuards(JwtAuthGuard)
    @Put('work')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async editWork(@UploadedFile() file, @Body() body): Promise<void> {
        const { id, title, nomination, year, evaluation, system, adventureType, description } = body;
        
        if (!id || !title || !nomination || !year || !evaluation || !system) {
            throw new HttpException('Неверные параметры работы', HttpStatus.BAD_REQUEST);
        }

        const oldWork = await this.worksService.findOne(id);

        if (file) {
            const oldFilePath = oldWork.filePath;
            const filePath = await this.worksService.saveFile(file, body.title, oldFilePath);

            return this.worksService.update({
                id,
                title,
                nomination,
                year,
                evaluation,
                system,
                adventureType,
                filePath,
                description,
            });
        }
        
        let filePath;

        if (oldWork.title !== title) {
            filePath = await this.worksService.renameFile(oldWork.filePath, title);
        }

        return this.worksService.update({
            id,
            title,
            nomination,
            year,
            evaluation,
            system,
            adventureType,
            description,
            filePath,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('work')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async insertWork(@UploadedFile() file, @Body() body): Promise<void> {
        const filePath = await this.worksService.saveFile(file, body.title);
        
        const { title, nomination, year, evaluation, system, adventureType, description } = body;
        if (!title || !nomination || !year || !evaluation || !system || !description) {
            throw new HttpException('Неверные параметры работы', HttpStatus.BAD_REQUEST);
        }

        return this.worksService.insert({
            title,
            nomination,
            year,
            evaluation,
            system,
            adventureType: adventureType === 'scenario' || adventureType === 'decoration' ? adventureType : null,
            filePath,
            description,
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
}

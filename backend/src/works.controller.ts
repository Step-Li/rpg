import { Controller, Get, Post, Body, HttpException, HttpStatus, Header, Delete, Query, UseInterceptors, UploadedFile, HttpCode, Res, Put } from '@nestjs/common';
import { WorksService } from './works.service';
import { Work } from './work.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import * as fs from 'fs';
import * as path from 'path';

@Controller('works')
export class WorksController {
    constructor(private worksService: WorksService) {}

    @Get()
    async findAll(): Promise<Work[]> {
        console.log('get');
        return this.worksService.findAll();
    }

    @Delete()
    async delete(@Query() query): Promise<void> {
        console.log(query);
        return this.worksService.remove(query.id);
    }

    @Put()
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async editWork(@UploadedFile() file, @Body() body): Promise<void> {
        const { id, title, nomination, year, evaluation, system, adventureType } = body;
        if (!id || !title || !nomination || !year || !evaluation || !system) {
            throw new HttpException('Неверные параметры работы', HttpStatus.BAD_REQUEST);
        }

        if (file) {
            const filePath = this.worksService.saveFile(file, body.title);

            return this.worksService.update({
                id,
                title,
                nomination,
                year,
                evaluation,
                system,
                adventureType,
                filePath,
            });
        }

        return this.worksService.update({
            id,
            title,
            nomination,
            year,
            evaluation,
            system,
            adventureType,
        });
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('file'),
    )
    async insertWork(@UploadedFile() file, @Body() body): Promise<void> {

        console.log('files', file);
        console.log('body', body);

        const filePath = this.worksService.saveFile(file, body.title);
        
        const { title, nomination, year, evaluation, system, adventureType } = body;
        if (!title || !nomination || !year || !evaluation || !system) {
            throw new HttpException('Неверные параметры работы', HttpStatus.BAD_REQUEST);
        }

        console.log(adventureType);

        return this.worksService.insert({
            title,
            nomination,
            year,
            evaluation,
            system,
            adventureType,
            filePath,
        });
    }

    @Get('download-file')
    async getFile(@Query() query, @Res() response: Response) {
        const buffer = await this.worksService.getFileBuffer(query.id);
        const stream = this.worksService.getReadableStream(buffer);

        response.set({
            'Content-Type': 'application/pdf',
            'Content-Length': buffer.length,
        });

        stream.pipe(response);
    }
}


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { translit } from './utils/translit';
import { Readable } from 'stream';

@Injectable()
export class WorksService {
    constructor(
        @InjectRepository(Work)
        private worksRepository: Repository<Work>,
    ) { }

    findAll(): Promise<Work[]> {
        return this.worksRepository.find();
    }

    findOne(id: string): Promise<Work> {
        return this.worksRepository.findOne(id);
    }

    async insert(work: Work): Promise<void> {
        await this.worksRepository.insert(work);
    }

    async update(work: Partial<Work>): Promise<void> {
        await this.worksRepository.update(work.id, work);
    }

    async remove(id: string): Promise<void> {
        await this.worksRepository.delete(id);
    }

    saveFile(file: any, workname: string): string {
        const dirName = path.resolve(os.homedir(), 'workspace', 'RPG', 'files', workname);

        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }

        const translittedName = translit(file.originalname);

        const fileName = path.resolve(dirName, translittedName);

        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
        }

        fs.writeFileSync(fileName, Buffer.from(file.buffer));

        return fileName;
    }

    async getFilePath(workId: string): Promise<string> {
        const work = await this.worksRepository.findOne(workId);

        return work.filePath;
    }

    async getFileBuffer(workId: string): Promise<Buffer> {
        const work = await this.worksRepository.findOne(workId);

        return fs.readFileSync(work.filePath);
    }

    getReadableStream(buffer: Buffer): Readable {
        const stream = new Readable();
      
        stream.push(buffer);
        stream.push(null);
      
        return stream;
      }
}
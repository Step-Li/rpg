import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';

import { translit } from '../../utils/translit';
import { Readable } from 'stream';
import { promisify } from 'util';

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const exists = promisify(fs.exists);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const rename = promisify(fs.rename);

function createFilePath(name: string) {
    const translittedName = translit(name).trim() + '.pdf';
    return path.resolve(os.homedir(), 'files', translittedName);
}

@Injectable()
export class WorksService {
    constructor(
        @InjectRepository(Work)
        private worksRepository: Repository<Work>,
    ) { }

    findAll(): Promise<Work[]> {
        return this.worksRepository.find();
    }

    findOne(id: number): Promise<Work> {
        return this.worksRepository.findOne(id, { relations: ['reviews'] });
    }

    async insert(work: Work): Promise<void> {
        await this.worksRepository.insert(work);
    }

    async update(work: Partial<Work>): Promise<void> {
        await this.worksRepository.update(work.id, work);
    }

    async delete(id: number): Promise<void> {
        await this.worksRepository.delete(id);
    }

    async saveFile(file: any, workname: string, oldPath?: string): Promise<string> {
        if (await exists(oldPath)) {
            await unlink(oldPath);
        }

        const filePath = createFilePath(workname);

        if (await exists(filePath)) {
            await unlink(filePath);
        }

        await writeFile(filePath, Buffer.from(file.buffer));

        return filePath;
    }

    async deleteFile(filePath: string) {
        if (await exists(filePath)) {
            await unlink(filePath);
        }
    }

    async renameFile(oldPath: string, newName: string): Promise<string | undefined> {
        if (await exists(oldPath)) {
            const newPath = createFilePath(newName);

            await rename(oldPath, newPath);

            return newPath;
        }
    }

    async getFilePath(workId: string): Promise<string> {
        const work = await this.worksRepository.findOne(workId);

        return work.filePath;
    }

    async getFileBuffer(filePath: string): Promise<Buffer> {
        return readFile(filePath);
    }

    getReadableStream(buffer: Buffer): Readable {
        const stream = new Readable();

        stream.push(buffer);
        stream.push(null);

        return stream;
    }
}

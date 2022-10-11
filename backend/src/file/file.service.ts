import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileDto | null> {
    const result = await this.fileModel
      .findById(id)
      .catch((_err) => {
        // throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        // return null;
      })
      .then((result) => result);
    if (result) {
      return {
        filename: result.filename,
        length: result.length,
        chunkSize: result.chunkSize,
        md5: result.md5,
        contentType: result.contentType,
      };
    }
    return null;
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
}

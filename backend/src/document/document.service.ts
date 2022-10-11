import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/file/file.service';
import { Document } from './document.type';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('Document')
    private documentModel: Model<Document>,
    private filesService: FilesService,
  ) {}
  async create(createDocumentDto: CreateDocumentDto) {
    const createdDocument = new this.documentModel(createDocumentDto);
    await createdDocument.save();
    return createdDocument;
  }

  async findAll() {
    const allDocuments = await this.documentModel.find();
    const response = await Promise.all(
      allDocuments.map(async (document: any) => {
        const file = await this.filesService.findInfo(document.fileId);
        if (file) {
          return {
            ...document._doc,
            file,
          };
        }
        return document;
      }),
    );
    return response;
  }

  async findOne(id: string) {
    const document: any = await this.documentModel.findById(id);
    if (!document) {
      throw new HttpException(
        "Document with provided id doesn't exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const file = await this.filesService.findInfo(document.fileId);
    return {
      ...document._doc,
      file,
    };
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentModel.findOneAndUpdate(
      { _id: id },
      updateDocumentDto,
    );
    if (!document) {
      throw new HttpException(
        "Document with provided id doesn't exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    return document;
  }

  async remove(id: string) {
    const document = await this.documentModel.findOneAndRemove({ id });
    if (!document) {
      throw new HttpException(
        "Document with provided id doesn't exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    return document;
  }
}

import { Document as MongooseDocument } from 'mongoose';

export interface Document extends MongooseDocument {
  username: string;
  password: string;
}

import { Expose } from 'class-transformer';

export class FileDto {
  @Expose()
  length: number;

  @Expose()
  chunkSize: number;

  @Expose()
  filename: string;

  @Expose()
  md5: string;

  @Expose()
  contentType: string;
}

export class FileResponseDto {
  message: string;
  file: FileDto;
}

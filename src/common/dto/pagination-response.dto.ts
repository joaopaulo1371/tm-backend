import { Expose } from 'class-transformer';

export class PaginationMetaDto {
  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;

  @Expose()
  hasNext: boolean;

  @Expose()
  hasPrev: boolean;

  constructor(partial: Partial<PaginationMetaDto>) {
    Object.assign(this, partial);
  }
}

export class PaginatedResponseDto<T> {
  @Expose()
  data: T[];

  @Expose()
  meta: PaginationMetaDto;

  constructor(data: T[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
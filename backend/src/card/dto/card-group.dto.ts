import { Exclude, Expose } from 'class-transformer';
import { BaseTimeStampedEntityDto } from '@nestjs-boilerplate/core';

@Exclude()
export class CardGroupDto extends BaseTimeStampedEntityDto {
  @Expose()
  name: string;
}

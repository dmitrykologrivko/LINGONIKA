import { Exclude, Expose } from 'class-transformer';
import { BaseTimeStampedEntityDto } from '@nestjs-boilerplate/core';

@Exclude()
export class CardGroupShortDto extends BaseTimeStampedEntityDto {
  @Expose()
  name: string;
}

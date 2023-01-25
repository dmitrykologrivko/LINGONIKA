import { Module } from '@nestjs/common';
import { DatabaseModule } from '@nestjs-boilerplate/core';
import { Card } from './entities/card.entity';
import { Group } from './entities/group.entity';
import { CardService } from './card.service';
import { CardController } from './card.controller';

@Module({
  imports: [DatabaseModule.withEntities([Card, Group])],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}

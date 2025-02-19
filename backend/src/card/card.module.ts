import { Module } from '@nestjs/common';
import { DatabaseModule } from '@nestjs-boilerplate/core';
import { Card } from './entities/card.entity';
import { CardGroup } from './entities/card-group.entity';
import { CardService } from './services/card.service';
import { CardGroupService } from './services/card-group.service';
import { CardController } from './controllers/card.controller';
import { CardGroupController } from './controllers/card-group.controller';

@Module({
  imports: [
    DatabaseModule.withEntities([Card, CardGroup], {
      cli: `${__dirname}/**/*.entity{.ts,.js}`,
    }),
  ],
  providers: [CardService, CardGroupService],
  controllers: [CardController, CardGroupController],
  exports: [DatabaseModule],
})
export class CardModule {}

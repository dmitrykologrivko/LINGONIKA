import { UseGuards } from '@nestjs/common';
import { CrudController, ApiController } from '@nestjs-boilerplate/core';
import { JwtAuthGuard } from '@nestjs-boilerplate/auth';
import { CardGroupService } from '../services/card-group.service';
import { CardGroupDto } from '../dto/card-group.dto';

@UseGuards(JwtAuthGuard)
@ApiController('groups')
export class CardGroupController extends CrudController<CardGroupDto> {
  constructor(private readonly groupsService: CardGroupService) {
    super(groupsService);
  }
}

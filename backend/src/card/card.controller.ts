import { UseGuards, Post, Body, Get, Query, Param } from '@nestjs/common';
import {
  CrudController,
  ApiController,
  unwrapResult,
} from '@nestjs-boilerplate/core';
import { AuthorizedUser, JwtAuthGuard } from '@nestjs-boilerplate/auth';
import { UserDto } from '@nestjs-boilerplate/user';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';
import { BulkDestroyInput } from './dto/bulk-destroy.input';

@UseGuards(JwtAuthGuard)
@ApiController('cards')
export class CardController extends CrudController<CardDto> {
  constructor(private cardService: CardService) {
    super(cardService);
  }

  @Post('action/bulk-delete')
  async bulkDestroy(
    @Body() input: BulkDestroyInput,
    @AuthorizedUser() user: UserDto,
  ) {
    return unwrapResult(
      await this.cardService.bulkDestroy({
        ...input,
        extra: {
          user,
        },
      }),
    );
  }

  @Get('stats')
  async cardsStatistic(
    @Query('languageFrom') languageFrom: string,
    @Query('languageTo') languageTo: string,
    @AuthorizedUser() user: UserDto,
  ) {
    return unwrapResult(
      await this.cardService.cardsStatistic({
        languageFrom,
        languageTo,
        extra: {
          user,
        },
      }),
    );
  }

  @Get('learn/:languageFrom/:languageTo')
  async learnCards(
    @Param('languageFrom') languageFrom: string,
    @Param('languageTo') languageTo: string,
    @AuthorizedUser() user: UserDto,
  ) {
    return unwrapResult(
      await this.cardService.learnCards({
        languageFrom,
        languageTo,
        extra: {
          user,
        },
      }),
    );
  }
}

import { UseGuards, Get, Post, Patch, Body, UseFilters } from '@nestjs/common';
import {
  ApiController,
  ValidationExceptionsFilter,
  unwrapResult,
} from '@nestjs-boilerplate/core';
import { JwtAuthGuard, AuthorizedUser } from '@nestjs-boilerplate/auth';
import { ProfileService } from './profile.service';
import { RegisterProfileInput } from './dto/register-profile.input';

@UseFilters(ValidationExceptionsFilter)
@ApiController('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@AuthorizedUser() user) {
    return unwrapResult(
      await this.profileService.getProfile({ userId: user.id }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() input: RegisterProfileInput, @AuthorizedUser() user) {
    return unwrapResult(
      await this.profileService.updateProfile({ ...input, userId: user.id }),
    );
  }

  @Post('register')
  async register(@Body() input: RegisterProfileInput) {
    return unwrapResult(await this.profileService.registerProfile(input));
  }
}

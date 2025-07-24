import { UseGuards, Get, Post, Patch, Body, UseFilters } from '@nestjs/common';
import {
  ApiController,
  ValidationExceptionsFilter,
} from '@nestjs-boilerplate/core';
import { UserDto } from '@nestjs-boilerplate/user';
import { JwtAuthGuard, AuthorizedUser } from '@nestjs-boilerplate/auth';
import { ProfileService } from './profile.service';
import { RegisterProfileInput } from './dto/register-profile.input';

@UseFilters(ValidationExceptionsFilter)
@ApiController('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@AuthorizedUser() user: UserDto) {
    return this.profileService.getProfile({ userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Body() input: RegisterProfileInput,
    @AuthorizedUser() user: UserDto,
  ) {
    return this.profileService.updateProfile({
      ...input,
      userId: user.id,
    });
  }

  @Post('register')
  async register(@Body() input: RegisterProfileInput) {
    return this.profileService.registerProfile(input);
  }
}

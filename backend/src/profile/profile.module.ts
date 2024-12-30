import { Module } from '@nestjs/common';
import { UserModule } from '@nestjs-boilerplate/user';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [UserModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}

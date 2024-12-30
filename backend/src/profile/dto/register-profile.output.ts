import { UserDto } from '@nestjs-boilerplate/user';
import { Exclude } from 'class-transformer';

@Exclude()
export class RegisterProfileOutput extends UserDto {}

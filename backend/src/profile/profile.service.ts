import { Repository } from 'typeorm';
import {
  PropertyConfigService,
  ApplicationService,
  InjectRepository,
  ClassValidator,
  ClassTransformer,
} from '@nestjs-boilerplate/core';
import {
  User,
  USER_PASSWORD_SALT_ROUNDS_PROPERTY,
} from '@nestjs-boilerplate/user';
import { GetProfileInput } from './dto/get-profile.input';
import { GetProfileOutput } from './dto/get-profile.output';
import { RegisterProfileInput } from './dto/register-profile.input';
import { RegisterProfileOutput } from './dto/register-profile.output';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UpdateProfileOutput } from './dto/update-profile.output';

@ApplicationService()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: PropertyConfigService,
  ) {}

  async getProfile(input: GetProfileInput): Promise<GetProfileOutput> {
    await ClassValidator.validate(GetProfileInput, input);

    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });

    return ClassTransformer.toClassObject(GetProfileOutput, user);
  }

  async registerProfile(
    input: RegisterProfileInput,
  ): Promise<RegisterProfileOutput> {
    await ClassValidator.validate(RegisterProfileInput, input);

    let user = await User.create(
      input.username,
      input.password,
      input.username,
      input.firstName,
      input.lastName,
      true,
      false,
      false,
      this.config.get(USER_PASSWORD_SALT_ROUNDS_PROPERTY),
    );
    user = await this.userRepository.save(user);

    return ClassTransformer.toClassObject(RegisterProfileOutput, user);
  }

  async updateProfile(input: UpdateProfileInput): Promise<UpdateProfileOutput> {
    await ClassValidator.validate(UpdateProfileInput, input);

    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });

    user.changeName(input.firstName, input.lastName);
    await this.userRepository.save(user);

    return ClassTransformer.toClassObject(UpdateProfileOutput, user);
  }
}

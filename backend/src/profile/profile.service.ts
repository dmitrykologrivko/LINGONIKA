import { Repository } from 'typeorm';
import {
  PropertyConfigService,
  ApplicationService,
  InjectRepository,
  ClassValidator,
  ClassTransformer,
  ValidationContainerException,
  Result,
  proceed,
  ok,
} from '@nestjs-boilerplate/core';
import {
  User,
  USER_PASSWORD_SALT_ROUNDS_PROPERTY,
} from '@nestjs-boilerplate/user';
import { GetProfileInput } from './dto/get-profile.input';
import { GetProfileOutput } from './dto/get-profile.output';
import { RegisterProfileInput } from './dto/register-profile.input';
import { RegisterProfileOutput } from './dto/register-profile.output';

@ApplicationService()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: PropertyConfigService,
  ) {}

  async getProfile(
    input: GetProfileInput,
  ): Promise<Result<GetProfileOutput, ValidationContainerException>> {
    return ClassValidator.validate(GetProfileInput, input).then(
      proceed(async () => {
        const user = await this.userRepository.findOne({
          where: { id: input.userId },
        });
        return ok(ClassTransformer.toClassObject(GetProfileOutput, user));
      }),
    );
  }

  async registerProfile(
    input: RegisterProfileInput,
  ): Promise<Result<RegisterProfileOutput, ValidationContainerException>> {
    return ClassValidator.validate(RegisterProfileInput, input).then(
      proceed(async () => {
        return User.create(
          input.username,
          input.password,
          input.username,
          input.firstName,
          input.lastName,
          false,
          false,
          false,
          this.config.get(USER_PASSWORD_SALT_ROUNDS_PROPERTY),
        ).then(
          proceed(async (user) => {
            user = await this.userRepository.save(user);
            return ok(
              ClassTransformer.toClassObject(RegisterProfileOutput, user),
            );
          }),
        );
      }),
    );
  }
}

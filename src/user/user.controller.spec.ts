import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateController } from './controllers/user.create.controller';
import { UserCreateService } from './services/user.create.service';

describe('UserController', () => {
  let controller: UserCreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateController],
      providers: [UserCreateService],
    }).compile();

    controller = module.get<UserCreateController>(UserCreateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

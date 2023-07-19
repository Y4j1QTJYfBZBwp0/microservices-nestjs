import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const result = userService.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
});

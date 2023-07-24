import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserDTO } from './dto/user.dto';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest
              .fn()
              .mockResolvedValue(
                new UserDTO('1', 'user1', 'user1@domain.com', 'hard_password'),
              ),
            save: jest
              .fn()
              .mockResolvedValue(
                new UserDTO('1', 'user1', 'user1@domain.com', 'hard_password'),
              ),
            update: jest
              .fn()
              .mockResolvedValue(
                new UserDTO('1', 'user1', 'user1@domain.com', 'hard_password'),
              ),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('Root', () => {
    describe('Create a user', () => {
      it('should create a user', async () => {
        const result = userService.create(
          new UserDTO('1', 'user1', 'user1@domain.com', 'hard_password'),
        );

        expect(result).resolves.toBeInstanceOf(UserDTO);
      });
    });
    describe('Update a user', () => {
      it('should update a user', async () => {
        const result = userService.update(
          '1',
          new UserDTO('1', 'user1', 'user1@domain.com', 'hard_password'),
        );
        expect(result).resolves.toBeInstanceOf(UserDTO);
      });
    });
    describe('Delete a user', () => {
      it('should delete a user', async () => {
        const result = userService.delete('1');
        expect(result).resolves.toBeUndefined();
      });
    });
    describe('Find one user', () => {
      it('should return a user', async () => {
        const result = userService.findById('1');
        expect(result).resolves.toBeInstanceOf(UserDTO);
      });
    });
    describe('Find all user', () => {
      it('should return an array of users', async () => {
        const result = userService.findAll();
        expect(result).resolves.toBeInstanceOf(Array);
      });
    });
  });
});

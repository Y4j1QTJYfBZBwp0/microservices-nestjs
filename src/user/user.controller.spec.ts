import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserDTO } from './dto/user.dto';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
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

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    describe('User', () => {
      describe('Register a user', () => {
        it('should create a user', async () => {
          const userDTO: UserDTO = new UserDTO(
            '1',
            'user1',
            'user1@domain.com',
            'hard_password',
          );
          expect(userController.create(userDTO)).resolves.toStrictEqual(
            userDTO,
          );
        });
      });
      describe('Update a user', () => {
        it('should update a user', async () => {
          const userDTO: UserDTO = new UserDTO(
            '1',
            'user1',
            'user1@domain.com',
            'hard_password',
          );
          expect(userController.update('1', userDTO)).resolves.toStrictEqual(
            userDTO,
          );
        });
      });
      describe('Delete a user', () => {
        it('should delete a user', async () => {
          expect(userController.delete('1')).resolves.toBeUndefined();
        });
      });
      describe('Find a user', () => {
        it('should return a user', async () => {
          expect(userController.findById('1')).resolves.toBeInstanceOf(UserDTO);
        });
      });
      describe('List all users', () => {
        it('should return an array of users', async () => {
          expect(userController.findAll()).resolves.toStrictEqual([]);
        });
      });
    });
  });
});

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userDTO: UserDTO): Promise<UserDTO> {
    const { name, email, password } = userDTO;

    const user: UserEntity = await this.userRepository.save({
      name,
      email,
      password,
    });

    return new UserDTO(user.id, user.name, user.email, user.password);
  }

  async update(id: string, userDTO: UserDTO): Promise<UserDTO> {
    const { name, email, password } = userDTO;

    await this.userRepository.update(id, {
      name,
      email,
      password,
    });

    return userDTO;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findById(id: string): Promise<UserDTO> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });

    return new UserDTO(user.id, user.name, user.email, user.password);
  }

  async findAll(): Promise<UserDTO[]> {
    const users: UserEntity[] = await this.userRepository.find();

    const usersDTO: UserDTO[] = users.map((user) => {
      return new UserDTO(user.id, user.name, user.email, user.password);
    });

    return usersDTO;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDTO: UserDTO): Promise<UserDTO> {
    return await this.userService.create(userDTO);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() userDTO: UserDTO,
  ): Promise<UserDTO> {
    return await this.userService.update(id, userDTO);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }

  @Get()
  async findAll(): Promise<UserDTO[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<UserDTO> {
    return await this.userService.findById(id);
  }
}

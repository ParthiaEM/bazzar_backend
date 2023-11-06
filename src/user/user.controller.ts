import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { access } from 'fs';
import { json } from 'stream/consumers';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (await this.userService.isUserIdExist(createUserDto.userId)) {
      throw new ConflictException('UserId already exists');
    }
    return await this.userService.create(createUserDto);
  }

  @Post('/login')
  async loginUser(@Body() loginuserDTO: LoginUserDTO) {
    const accessToken = await this.userService.login(loginuserDTO);
    if (accessToken) return { login: true, accessToken };

    return { login: false };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}

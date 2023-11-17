import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
  Put,
  Req,
  Res,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { Request, Response } from 'express';
import RequestWithUser from '../auth/requestWithuser.interface';
import JwtAuthenticationGuard from 'src/auth/jwt.auth.guard';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (await this.userService.isUserIdExist(createUserDto.userId)) {
      throw new ConflictException('UserId already exists');
    }
    await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ create: true });
  }

  @HttpCode(200)
  @Post('/login')
  async loginUser(@Body() loginuserDTO: LoginUserDTO, @Res() res: Response) {
    const authorized = await this.userService.login(loginuserDTO);
    if (authorized) {
      const accessToken = this.authService.getCookieWithJwtToken(
        authorized.userUniqueId,
      );

      return res.json({ login: 'success', userInfo: authorized, accessToken });
    }

    return res.json({ login: 'failed' });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(+id);
    delete user.userPassword;
    return user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    delete user.userPassword;
    return user;
  }
}

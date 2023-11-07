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
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/auth.guard';
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
    return res.status(HttpStatus.CREATED).json({ created: true });
  }
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(
    @Body() loginuserDTO: LoginUserDTO,
    @Req() req,
    @Res() res: Response,
  ) {
    const { user } = req;
    const authorized = await this.userService.login(loginuserDTO);
    if (authorized) {
      const cookie = this.authService.getCookieWithJwtToken(user.userUniqueId);
      req.session.userData = authorized;
      res.setHeader('Set-Cookie', cookie);
      user.userPassword = undefined;

      return res.send(user);
    }

    return res.status(HttpStatus.OK).json({ login: 'failed' });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    console.log(req['user']);
    return this.userService.update(+id, updateUserDto);
  }
}

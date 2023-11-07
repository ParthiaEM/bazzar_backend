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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (await this.userService.isUserIdExist(createUserDto.userId)) {
      throw new ConflictException('UserId already exists');
    }
    await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ created: true });
  }

  @Post('/login')
  async loginUser(
    @Body() loginuserDTO: LoginUserDTO,
    @Req() req,
    @Res() res: Response,
  ) {
    const authorized = await this.userService.login(loginuserDTO);
    if (authorized) {
      req.session.userData = authorized;

      return res
        .status(HttpStatus.OK)
        .json({ login: 'success', userData: req.session.userData });
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

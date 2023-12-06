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
import { IdeaService } from 'src/idea/idea.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly ideaService: IdeaService,
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

  @UseGuards(JwtAuthenticationGuard)
  @Get('myBid/get')
  async getMyInfo(@Req() req: RequestWithUser, @Res() res: Response) {
    const bidInfo = await this.ideaService.findBid(req.user.userUniqueId);
    console.log(bidInfo);
    return res.json({
      posted: bidInfo.posted,
      bidding: bidInfo.biding,
      purchased: bidInfo.posted,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.update(+id, updateUserDto);
    return res.json({ update: 'success' });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user;
    delete user.userPassword;
    return user;
  }

  @Put('lux/:id')
  manageLux(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    this.userService.updateLux(id, updateUserDto);
    return res.json({ lux: 'success' });
  }
}

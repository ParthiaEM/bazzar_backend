import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Req,
  UseGuards,
  Put,
  Res,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import RequestWithUser from 'src/auth/requestWithuser.interface';
import JwtAuthenticationGuard from 'src/auth/jwt.auth.guard';
import { Response } from 'express';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createIdeaDto: CreateIdeaDto,
    @Req() request: RequestWithUser,
    @Res() res: Response,
  ) {
    createIdeaDto.ideaInfo.postedUserId = request.user.userUniqueId;
    this.ideaService.create(createIdeaDto.ideaInfo);
    return res.json({ create: 'success' });
  }
  @HttpCode(200)
  @Get()
  findAll() {
    const result = this.ideaService.findAll();
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideaService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateIdeaDto: UpdateIdeaDto,
    @Req() request: RequestWithUser,
  ) {
    return console.log(request.user);
    //return this.ideaService.update(+id, updateIdeaDto, request.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ideaService.remove(+id);
  }
}

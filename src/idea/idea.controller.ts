import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import RequestWithUser from 'src/auth/requestWithuser.interface';
import JwtAuthenticationGuard from 'src/auth/jwt.auth.guard';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createIdeaDto: CreateIdeaDto,
    @Req() request: RequestWithUser,
  ) {
    createIdeaDto.postedUserId = request.user.userUniqueId;
    return this.ideaService.create(createIdeaDto);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdeaDto: UpdateIdeaDto) {
    return this.ideaService.update(+id, updateIdeaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ideaService.remove(+id);
  }
}

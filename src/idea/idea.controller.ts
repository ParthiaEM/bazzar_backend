import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Idea } from './entities/idea.entity';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  create(@Body() createIdeaDto: CreateIdeaDto) {
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

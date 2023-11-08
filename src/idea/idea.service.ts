import { Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Idea } from './entities/idea.entity';
import { Repository } from 'typeorm';
@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea)
    private readonly IdeaRepository: Repository<Idea>,
  ) {}
  async create(createIdeaDto: CreateIdeaDto) {
    return 'This action adds a new idea';
  }

  async findAll() {
    return await this.IdeaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} idea`;
  }

  update(id: number, updateIdeaDto: UpdateIdeaDto) {
    return `This action updates a #${id} idea`;
  }

  remove(id: number) {
    return `This action removes a #${id} idea`;
  }
}

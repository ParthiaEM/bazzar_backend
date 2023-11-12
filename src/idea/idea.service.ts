import { Injectable } from '@nestjs/common';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Idea } from './entities/idea.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea)
    private readonly IdeaRepository: Repository<Idea>,
  ) {}

  create(idea: Idea) {
    return this.IdeaRepository.save(idea);
  }

  async findAll() {
    return await this.IdeaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} idea`;
  }

  update(id: number, updateIdeaDto: UpdateIdeaDto, user: User) {
    console.log(user);
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} idea`;
  }
}

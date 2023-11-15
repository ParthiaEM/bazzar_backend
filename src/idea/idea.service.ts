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

  async update(ideaId: number, updateIdeaDto: UpdateIdeaDto, user: User) {
    let result = await this.IdeaRepository.findOne({ where: { ideaId } });
    if (result.postedUserId == user.userUniqueId) {
      await this.IdeaRepository.save(result);
    }
    return user;
  }

  async remove(ideaId: number, postedUserId: number) {
    return await this.IdeaRepository.delete({
      ideaId,
      postedUserId,
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Idea } from './entities/idea.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { NotFoundError } from 'rxjs';
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
    const { ideaName, ideaDetail, price } = updateIdeaDto.ideaInfo;

    const result = await this.IdeaRepository.findOne({ where: { ideaId } });
    if (!result) throw new NotFoundException();

    if (result.postedUserId == user.userUniqueId) {
      result.ideaName = ideaName;
      result.ideaDetail = ideaDetail;

      return await this.IdeaRepository.save(result);
    }
    result.price = price;

    return await this.IdeaRepository.save(result);
  }

  async remove(ideaId: number, postedUserId: number) {
    return await this.IdeaRepository.delete({
      ideaId,
      postedUserId,
    });
  }
}

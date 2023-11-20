import { Injectable, NotFoundException } from '@nestjs/common';
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
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  create(idea: Idea) {
    return this.IdeaRepository.save(idea);
  }

  async findAll() {
    return await this.IdeaRepository.find();
  }

  async findOne(ideaId: number) {
    const result = await this.IdeaRepository.findOne({ where: { ideaId } });
    return result;
  }

  async endBid(ideaId: number) {
    const result = await this.IdeaRepository.findOne({ where: { ideaId } });
    if (!result) throw new NotFoundException('idea Not Found');
    result.isTrading = false;
    result.purchasedUserId = result.bidUserId;
    result.bidUserId = 0;

    return await this.IdeaRepository.save(result);
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
    result.bidUserId = user.userUniqueId;
    result.count += 1;
    result.isTrading = true;
    result.price = price;

    return await this.IdeaRepository.save(result);
  }

  async remove(ideaId: number, postedUserId: number) {
    return await this.IdeaRepository.delete({
      ideaId,
      postedUserId,
    });
  }
  async findPurchasedIdea(ideaId: number, purchasedUserId: number) {
    return await this.IdeaRepository.findOne({
      where: { ideaId, purchasedUserId },
    });
  }
}

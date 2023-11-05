import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async isUserIdExist(userId): Promise<boolean> {
    const users = await this.userRepository.findOne({ where: { userId } });
    return !!users;
  }

  async create(user: User): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.userPassword, saltRounds);
    user.userPassword = hashedPassword;
    return await this.userRepository.save(user);
  }

  async findOne(userUniqueId: number): Promise<User> {
    //JWT부분
    return await this.userRepository.findOne({ where: { userUniqueId } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //JWT부분
    return await this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

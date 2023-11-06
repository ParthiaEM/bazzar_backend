import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
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

  async login(loginuserDTO: LoginUserDTO) {
    const userId = loginuserDTO.userId;
    const userData = await this.userRepository.findOne({ where: { userId } });

    if (!userData) return;
    const isPasswordMatch = await bcrypt.compare(
      loginuserDTO.userPassword,
      userData.userPassword,
    );
    if (isPasswordMatch) {
      const payload = { sub: userData.userUniqueId };
      const accessToken = this.jwtService.sign(payload);
      return accessToken;
    }
    return false;
  }
}

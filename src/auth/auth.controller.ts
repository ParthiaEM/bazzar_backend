import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // AuthGuard import
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
}

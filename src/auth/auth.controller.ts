import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('twitch')
  @UseGuards(AuthGuard('twitch'))
  twitchLogin() {}

  @Get('twitch/callback')
  @UseGuards(AuthGuard('twitch'))
  async twitchLoginCallback(@Req() req, @Res() res) {
    const user = req.user;
    console.log(user); 
  }
}

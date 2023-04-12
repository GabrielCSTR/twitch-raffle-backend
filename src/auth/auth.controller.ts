import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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
    const payload = { 
      ...user,
    }
    const token = await this.authService.generateAccessToken(payload);
    res.cookie('stream_raffle_user', token );
    res.redirect(process.env.FRONTEND_HOST +'/#/dashboard');
  }
}

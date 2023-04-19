import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { TwitchAuthGuard } from '@app/auth/guards/twitch-auth.guard';
import { Request } from 'express';

@UseGuards(TwitchAuthGuard)
@Controller('twitch')
export class TwitchController {
  constructor(private readonly twitchService: TwitchService) {}

  @Get(':userId/subs')
  async getSubs(@Param('userId') userId: string, @Req() req) {
    const subs = await this.twitchService.getSubs(userId, req.accessToken);
    return subs.data;
  }

  @Get(':userId/views')
  async getViews(@Param('userId') userId: string, @Req() req) {
    const subs = await this.twitchService.getViews(userId, req.accessToken);
    return subs.data;
  }

}

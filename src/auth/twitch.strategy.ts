import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy as TwitchStrategy } from "passport-twitch-strategy"
import * as APP_CONFIG from '@app/app.config'

@Injectable()
export class twitchStrategy extends PassportStrategy(TwitchStrategy, 'twitch') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: APP_CONFIG.TWITCH.clientID,
      clientSecret: APP_CONFIG.TWITCH.clientSecret,
      callbackURL: APP_CONFIG.TWITCH.callbackURL,
      scope: APP_CONFIG.TWITCH.scope
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log("PROFILE", profile);
    console.log("TOKEN", accessToken);
    return profile;
  }
}
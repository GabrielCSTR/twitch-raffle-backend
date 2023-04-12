import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { twitchStrategy } from './twitch.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'steam', session: true }),],
  controllers: [AuthController],
  providers: [AuthService, twitchStrategy]
})
export class AuthModule {}

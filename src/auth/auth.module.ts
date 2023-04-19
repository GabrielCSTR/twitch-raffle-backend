import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { twitchStrategy } from './twitch.strategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/users/entities/user.entity';
import { UsersModule } from '@app/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as APP_CONFIG from '@app/app.config'
import { TwitchAuthGuard } from './guards/twitch-auth.guard';
@Module({
  imports: [ 
    UsersModule,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({ defaultStrategy: 'steam', session: true }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: APP_CONFIG.AUTH.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, twitchStrategy, TwitchAuthGuard]
})
export class AuthModule {}

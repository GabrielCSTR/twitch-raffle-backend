import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as APP_CONFIG from '@app/app.config';
import { ConfigModule } from '@nestjs/config';
import { TwitchModule } from './twitch/twitch.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RouletteBetsModule } from './roulette-bets/roulette-bets.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: `mongodb+srv://streamraffle:DEVstr2305@clusterstreamraffle.xhvxvkv.mongodb.net/?retryWrites=true&w=majority`,
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      logging: true,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule, 
    UsersModule, TwitchModule, RouletteBetsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

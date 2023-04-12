import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as APP_CONFIG from '@app/app.config';
import { ConfigModule } from '@nestjs/config';

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
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

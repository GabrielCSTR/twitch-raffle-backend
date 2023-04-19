import { Module } from '@nestjs/common';
import { RouletteBetsService } from './roulette-bets.service';
import { RouletteBetsController } from './roulette-bets.controller';

@Module({
  controllers: [RouletteBetsController],
  providers: [RouletteBetsService]
})
export class RouletteBetsModule {}

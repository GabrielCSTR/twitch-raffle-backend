import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouletteBetsService } from './roulette-bets.service';
import { CreateRouletteBetDto } from './dto/create-roulette-bet.dto';
import { UpdateRouletteBetDto } from './dto/update-roulette-bet.dto';

@Controller('roulette-bets')
export class RouletteBetsController {
  constructor(private readonly rouletteBetsService: RouletteBetsService) {}

  @Get('winner/:amountUsers')
  getRouletteWinner(@Param('amountUsers') amountUsers: number) {
    return this.rouletteBetsService.getRouletteWinner(amountUsers);
  }

}

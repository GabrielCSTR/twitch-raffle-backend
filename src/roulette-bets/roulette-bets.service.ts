import { Injectable } from '@nestjs/common';
import { CreateRouletteBetDto } from './dto/create-roulette-bet.dto';
import { UpdateRouletteBetDto } from './dto/update-roulette-bet.dto';

@Injectable()
export class RouletteBetsService {
  
  getRouletteWinner(amountUsers: number){
    return this.sorterWinner(amountUsers);
  }

  sorterWinner(totalUsers: number) {
    const winner = Math.floor(Math.random() * totalUsers);
    return winner;
  }
}

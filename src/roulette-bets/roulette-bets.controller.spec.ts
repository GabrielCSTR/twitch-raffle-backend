import { Test, TestingModule } from '@nestjs/testing';
import { RouletteBetsController } from './roulette-bets.controller';
import { RouletteBetsService } from './roulette-bets.service';

describe('RouletteBetsController', () => {
  let controller: RouletteBetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouletteBetsController],
      providers: [RouletteBetsService],
    }).compile();

    controller = module.get<RouletteBetsController>(RouletteBetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

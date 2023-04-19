import { Test, TestingModule } from '@nestjs/testing';
import { RouletteBetsService } from './roulette-bets.service';

describe('RouletteBetsService', () => {
  let service: RouletteBetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RouletteBetsService],
    }).compile();

    service = module.get<RouletteBetsService>(RouletteBetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

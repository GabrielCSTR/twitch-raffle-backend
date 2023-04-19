import { PartialType } from '@nestjs/mapped-types';
import { CreateRouletteBetDto } from './create-roulette-bet.dto';

export class UpdateRouletteBetDto extends PartialType(CreateRouletteBetDto) {}

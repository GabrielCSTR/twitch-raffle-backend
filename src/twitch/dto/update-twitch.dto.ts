import { PartialType } from '@nestjs/mapped-types';
import { CreateTwitchDto } from './create-twitch.dto';

export class UpdateTwitchDto extends PartialType(CreateTwitchDto) {}

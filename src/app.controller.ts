import { Controller, Get } from '@nestjs/common';
import * as APP_CONFIG from './app.config'

@Controller()
export class AppController {
  @Get()
  root(): any {
    return APP_CONFIG.PROJECT
  }
}

import { Controller, Get } from '@nestjs/common';

import { Message } from '@quicken-interview/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}

import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { UserOwes } from '@quicken-interview/api-interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly userService: PaymentsService) {}

  @Get()
  findAll(): UserOwes[] {
    return this.userService.doCalc();
  }
}

import { Controller, Get } from '@nestjs/common';
import { MailService } from './mailer.service';

@Controller('mailer')
export class MailController {
  constructor(private readonly service: MailService) {}

  @Get()
  async getHello() {
    return this.service.sendTestMail();
  }
}

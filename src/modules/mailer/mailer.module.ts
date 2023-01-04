import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {},
        },
        defaults: {
          from: "'admin' <modules@nestjs.com>",
        },
        template: {
          dir: __dirname + 'templates',
        },
      }),
    }),
  ],
  providers: [MailService],
})
export class MailModule {
  constructor() {
    console.log('dirname:', __dirname);
  }
}

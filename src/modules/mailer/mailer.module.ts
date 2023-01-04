import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailController } from './mailer.controller';
import { MailService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        config = new ConfigService();
        return {
          transport: {
            host: 'smtp.sendgrid.net',
            secure: false,
            auth: {
              user: config.get('SEND_GRID_USER'),
              pass: config.get('SEND_GRID_PASS'),
            },
          },
          defaults: {
            from: "'admin' <modules@nestjs.com>",
          },
          template: {
            dir: __dirname + 'templates',
          },
        };
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {
  constructor() {
    console.log('dirname:', __dirname);
  }
}

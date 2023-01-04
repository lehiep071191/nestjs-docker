import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlerbars from 'handlebars';

interface MailerHtmlOptions {
  toEmail: string | string[];
  replacement?: any;
  subject?: string;
  htmlFile: string;
}
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
    console.log(mailerService);
  }

  async sendTestMail() {
    const mailOptions: MailerHtmlOptions = {
      toEmail: 'good.boy.0991@gmail.com',
      htmlFile: 'welcome.html',
      subject: 'Welcome to my room',
      replacement: {
        email: 'good.boy.0991@gmail.com',
      },
    };

    return await this.sendHtmlFile(mailOptions);
  }

  async sendHtmlFile(options: MailerHtmlOptions) {
    const dirname = `src/modules/mailer/templates/`;
    const html = fs.readFileSync(`${dirname}${options.htmlFile}`, {
      encoding: 'utf-8',
    });
    const template = handlerbars.compile(html);
    const htmlToSend = template(options.replacement);
    const response = await this.mailerService.sendMail({
      from: 'good.boy.0991@gmail.com',
      to: options.toEmail,
      text: htmlToSend,
      subject: options.subject,
    });
    return response;
  }
}

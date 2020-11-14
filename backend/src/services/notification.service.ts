import nodemailer from 'nodemailer';
import { config } from '../config';
import { TransactionAttributes } from '../models/transaction.model';
import { ProductAttributes } from '../models/product.model';

class NotificationService {
  testAccount: nodemailer.TestAccount;
  transporter: any;

  constructor() {}

  async prepareAccounts() {
    const transporterConfig = config.mailer as any;
    if (config.mailer.host === 'smtp.ethereal.email') {
      this.testAccount = await nodemailer.createTestAccount();
      transporterConfig.auth.user = this.testAccount.user; // generated ethereal user
      transporterConfig.auth.password = this.testAccount.user; // generated ethereal password
    }
    this.transporter = nodemailer.createTransport(transporterConfig);
  }

  private async sendMail(receiver: string, message: IMessage) {
    // send mail with defined transport object
    const info = await this.transporter.sendMail({
      from: '\'💕 Babies love it\' <notify@sendme.one>', // sender address
      to: receiver, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: message.text || 'Hello world?', // plain text body
      html: message.html || '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

  async transactionNotification(
    receiver: string,
    transaction: TransactionAttributes,
    product: ProductAttributes
  ) {
    const message = {
      text:
        `Congrats you bought the item: ${product.title}\n` +
        `The price of the product you payed was ${transaction.price}`,
      html:
        `Congrats you bought the item: <br>${product.title}</br>` +
        `<p>The price of the product you payed was <br>${transaction.price}</br></p>`,
    };
    return this.sendMail(receiver, message);
  }
}

interface IMessage {
  text: string;
  html: string;
}

export const notificationService = new NotificationService();

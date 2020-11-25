import nodemailer from 'nodemailer';
import { config } from '../config';
import {
  TransactionAttributes,
  Transaction,
} from '../models/transaction.model';
import { ProductAttributes, Product } from '../models/product.model';
import { Notification } from '../models/notification.model';

class NotificationService {
  transporter: any;

  constructor() {}

  async prepareAccounts() {
    const transporterConfig = config.mailer as any;
    if (config.mailer.host === 'smtp.ethereal.email') {
      const testAccount = await nodemailer.createTestAccount();
      transporterConfig.host = testAccount.smtp.host;
      transporterConfig.port = testAccount.smtp.port;
      transporterConfig.secure = testAccount.smtp.secure;
      transporterConfig.auth = {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      };
    }
    this.transporter = nodemailer.createTransport(transporterConfig);
  }

  private async sendMail(receiver: string, message: IMessage) {
    try {
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

      if (config.mailer.host === 'smtp.ethereal.email') {
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    } catch (err) {
      throw err;
    }
  }

  async transactionBuyerNotification(
    receiver: string,
    transaction: TransactionAttributes,
    product: ProductAttributes
  ) {
    const message = {
      text:
        `Congrats you ${
          product.purchaseType === 'buy' ? 'bought' : 'rent'
        } the item: ${product.title}\n` +
        `The price of the product you payed was ${transaction.price}`,
      html:
        `Congrats you ${
          product.purchaseType === 'buy' ? 'bought' : 'rent'
        } the item: <br>${product.title}</br>` +
        `<p>The price of the product was <br>${transaction.price}</br></p>`,
    };
    return this.sendMail(receiver, message);
  }

  async transactionSellerNotification(
    receiver: string,
    transaction: TransactionAttributes,
    product: ProductAttributes
  ) {
    const message = {
      text:
        `Congrats you ${
          product.purchaseType === 'buy' ? 'sold' : 'rent'
        } the item: ${product.title}\n` +
        `The price of the product you payed was ${transaction.price}`,
      html:
        `Congrats you ${
          product.purchaseType === 'buy' ? 'sold' : 'rent'
        } the item: <br>${product.title}</br>` +
        `<p>The price of the product was <br>${transaction.price}</br></p>`,
    };
    return this.sendMail(receiver, message);
  }

  async getMyNotifications(userId: number) {
    return Notification.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Transaction as any,
          include: Product as any,
        },
        {
          model: Product as any
        }
      ]
    });
  }

  async getMyNewNotifications(userId: number) {
    return Notification.count({
      where: {
        UserId: userId,
        status: 'new'
      },
    });
  }

  async addNotification(userId: number, transactionId: number, notificationType: string, contactEmail: string) {
      Notification.create({
          UserId: userId,
          TransactionId: transactionId,
          notificationType,
          contactEmail
      });
  }

  async addStatusNotification(userId: number, productId: number, notificationType: string) {
    Notification.create({
        UserId: userId,
        ProductId: productId,
        notificationType
    });
  }



  async seenNotification(notificationId: string) {
      const notification = await Notification.findOne({
          where: {
              id: notificationId
          }
      });
      notification.status = 'seen';
      return notification.save();
  }
}

interface IMessage {
  text: string;
  html: string;
}

export const notificationService = new NotificationService();

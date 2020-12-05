import express, { Router, Request, Response, NextFunction } from 'express';
import {IAuthRequest, verifyToken} from '../middlewares/checkAuth';
import { answerService } from '../services/answer.service';
import { notificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';
import {questionService} from '../services/question.service';
import { userService } from '../services/user.service';

const questionController: Router = express.Router();
const productService = new ProductService();



questionController.get(
  '/:questionId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const question = await questionService.get(req.params.questionId);
      res.send(question);
    } catch (err) {
      next(err);
    }
  }
);


questionController.get(
    '/prod/:productId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
          const questions = await questionService.getProductQuestions(req.params.productId);
          res.send(questions);
        } catch (err) {
          next(err);
        }
    }
);


questionController.post(
  '/',
  verifyToken,
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.userId;
      const productId = req.body.productId;
      const text = req.body.text;
      const product = await productService.get(productId);
      const question = await questionService.addQuestion(userId, productId, text);
      await notificationService.addQuestionNotification(product.UserId, productId, question.id, 'questionNotification' );
      res.send(question);
    } catch (err) {
      next(err);
    }
  }
);

questionController.post(
  '/answer',
  verifyToken,
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log('post entered');
      const userId = req.user.userId;
      const questionId = req.body.questionId;
      const text = req.body.text;
      const question = await questionService.get(questionId);
      const askingUser = await userService.get(question.UserId);
      const answer = await answerService.addAnswer(userId, questionId, text);
      await notificationService.addAnswerNotification(askingUser.id, questionId, 'answerNotification' );
      res.send(answer);
    } catch (err) {
      next(err);
    }
  }
);


export const QuestionController = questionController;

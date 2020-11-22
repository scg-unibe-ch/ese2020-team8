import express, { Router, Request, Response, NextFunction } from 'express';
import {IAuthRequest, verifyToken} from '../middlewares/checkAuth';
import {questionService} from '../services/question.service';

const questionController: Router = express.Router();

questionController.get(
    '/:productId',
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
      console.log('post entered');
      const userId = req.user.userId;
      const productId = req.body.productId;
      const text = req.body.text;
      const question = await questionService.addQuestion(userId, productId, text);
      res.send(question);
    } catch (err) {
      next(err);
    }
  }
);


export const QuestionController = questionController;

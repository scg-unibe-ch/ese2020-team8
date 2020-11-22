import { ProductAttributes, Product} from '../models/product.model';
import { Question } from '../models/question.model';

class QuestionService {
  transporter: any;

  constructor() {}

  async getProductQuestions(productId: string) {
    return Question.findAll({
      where: {
        ProductId: productId
      },
    });
  }

  async addQuestion(userId: number, productId: number, text: string) {
      Question.create({
          UserId: userId,
          ProductId: productId,
          text,
      });
  }
}

export const questionService = new QuestionService();
